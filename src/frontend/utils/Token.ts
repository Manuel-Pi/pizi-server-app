export const Token = {
    async getToken(username: string, password: string){
        let token: string = localStorage.getItem("token");
        if(!token && username && password){
            const response = await fetch("https://localhost:8087/pizi-rest/token", {
                method: 'POST',
                headers: {
                    login: username,
                    password: password,
                }
            });

            const json = await response.json();
            token = json.jwt;
            localStorage.setItem("token", token);
        }
        return token;
    },
    clearToken(){
        localStorage.removeItem("token");
    }
}