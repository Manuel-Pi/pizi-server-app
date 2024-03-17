import React, { useState, useContext } from 'react'
import { Button } from 'pizi-react'
import { H } from '../../components/Headings/Heading.js'
import { AppContext } from '../../utils/Utils.js'

type HomeProps = {
}

export const Home = ({}: HomeProps) => {
    const[currentTime, setCurrentTime] = useState(new Date())
    const appContext = useContext(AppContext)

    setInterval(() => setCurrentTime(new Date()), 60000)
    
    return  <div className="pizi-container home">
                { !appContext.token ?  <div className='pizi-container public'>
                                <img src="/icon.png"/>
                                <H tag="h1">Pizi Server</H>
                                <H tag="h3" color="teritary">A simple Node.js server providing oauth2 authentification</H>
                                <Button appearance="fill"onClick={ () => window.location.href = "/api/app/login"}>sign in</Button>
                            </div> 
                        :
                            <H tag="h1">
                                Pizi Server
                                <span className="date">
                                    <div suppressHydrationWarning>
                                    {
                                        appContext.browser ? [currentTime.toLocaleDateString('en-US', {weekday: 'long'}).toLowerCase(),
                                        currentTime.toLocaleDateString('en-US', {day: 'numeric'}),
                                        currentTime.toLocaleDateString('en-US', {month: 'long'}).toLowerCase(),
                                        currentTime.toLocaleDateString('en-US', {year: 'numeric'})].join(" ") : ""
                                    }
                                    </div>
                                    <div className="time" suppressHydrationWarning>
                                    {
                                        appContext.browser ? currentTime.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}) : ""
                                    }
                                    </div>
                                </span>
                            </H>
                }
            </div>
}