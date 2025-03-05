import { Route, Routes, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../../../routes";
import { FC, useEffect, useState } from "react";
import { SIGN_ROUTE, LOGIN_ROUTE } from "../../../utils/consts";
import { INavButtons } from "../../App/App";

interface IAppRouter {
    user: boolean;
    data: INavButtons[];
}

const AppRouter: FC<IAppRouter> = ({user, data}:IAppRouter) => {
    const [active, setActive] = useState('')
    function checkActive() {
        data.forEach(({name, active}) => {
            if (active) {
                setActive(name.toLocaleLowerCase())
            }
        })
    }

    useEffect(() => {
        checkActive()
    }, [active, checkActive])

    return user ? 
        (
            <>
                <Routes>
                    {privateRoutes.map(({ path, Component }) => {
                        return <Route key={path} path={path} element={<Component/>} />;
                    })}
                </Routes>
                <Navigate to={`${SIGN_ROUTE}/${active}`}/>
            </>

        ) 
        : 
        (
            <>
                <Routes>
                    {publicRoutes.map(({path, Component}) => {
                        return <Route key={path} path={path} element={<Component/>}/>
                    })}
                </Routes>
                <Navigate to={LOGIN_ROUTE}/>
            </>
        )
};

export default AppRouter;
