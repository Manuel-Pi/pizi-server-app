import React, { Suspense, use, useId, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, ButtonGroup, Json, Pagination, Spinner, Table } from 'pizi-react'
import { AppContext } from '../../utils/Utils.js'
import { createPortal } from 'react-dom'

type RenderType = 'table' | 'json'

export const RestUIDetail: React.FC = ({}) => {
    const noRenderId = useId()
    const { collectionName } = useParams()
    const { api, browser } = use(AppContext)
    const noRenderInput = browser ? (document.getElementById(noRenderId) as HTMLInputElement) : null
    const [renderType, setRenderType] = useState<RenderType>('table')
    const [documents, setDocuments] = useState(noRenderInput?.value ? JSON.parse(noRenderInput?.value) : null)
    const countRef = useRef(null) 

    const getDocuments = (collectionName?: string) => {
        if(!api || !collectionName || !Object.keys(api).includes(collectionName)){
            return Promise.resolve()
        } else {
            return (api as any)[collectionName].queries.list().catch((e: any) => console.error(e))
        }
    }

    const documentsPromise = useMemo(() => getDocuments(collectionName), [collectionName])

    async function createUser(){
       const user: any = await api?.users.mutations.create({
            username: "testUser",
            email: 'test@test.ca'
        })
        console.log('user created with id: ' + user?.id)
    }

    return  <div className="pizi-container rest-ui-detail">
                <input id={noRenderId} type="hidden" value={JSON.stringify({})}/>
                <ButtonGroup appearance='simple'>
                    <label className='total'><span ref={countRef}></span>documents</label>
                    <Button icon="plus" onClick={() => setRenderType('table')} align="right"  className={renderType === "table" ? "selected" : ""}></Button>
                    <Button icon="table" onClick={() => setRenderType('table')} align="right"  className={renderType === "table" ? "selected" : ""}></Button>
                    <Button icon="code" onClick={() => setRenderType('json')} className={renderType === "json" ? "selected" : ""}></Button>
                </ButtonGroup>
                <div className='pizi-container detail'>
                    <Suspense fallback={<Spinner type={'circle-notch'}/>}>
                        <Documents documentsPromise={documentsPromise} renderType={renderType} totalPortal={countRef}/>
                    </Suspense>
                </div>
            </div>
}

type DocumentsProps = {
    documentsPromise: React.Usable<any[]>
    renderType: RenderType
    totalPortal?: React.MutableRefObject<null>
}

function Documents({documentsPromise, renderType, totalPortal}: DocumentsProps){
    const documents = use(documentsPromise)
    let render = <></>
    switch(renderType){
        case 'json':
            render = <Json json={documents}/>
            break
        case 'table':
            if(Array.isArray(documents) && documents.length) render =   <Table  staticHeader 
                                                                                appearance='simple' 
                                                                                header={Object.keys(documents[0])} 
                                                                                data={documents.map( obj => Object.values(obj).map(value => <Json json={value}></Json>))} 
                                                                                className='pizi-table animate__animated animate__fadeIn'>
                                                                            <Pagination/>
                                                                        </Table>
            break
    } 
    return  <>
            {render}
            {totalPortal?.current && createPortal(documents?.length || 0, totalPortal?.current)}
            </>
}