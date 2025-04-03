import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home";
import PageNotFoundWithIcons from "../page-not-found/PageNotFoundWithIcons";
import AboutUs from "../../pages/aboutUs/AboutUs";
import { AppRouterConstants } from "./AppRouter.contants";
import { LinkManagement } from "../../pages/link-management/LinkManagement";
import QrCodeGeneration from "../../pages/qr-code-generation/QrCodeGeneration";
import { SignUp } from "../../pages/sign-up/SignUp";
import { SignIn } from "../../pages/sign-in/SignIn";

interface AppRouterProps {
    children: React.ReactNode;
}

const AppRouter: React.FC<AppRouterProps> = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={AppRouterConstants.HOME} element={<Home />} />

                <Route path={AppRouterConstants.ABOUT_US} element={<AboutUs />} />
                <Route
                    path={AppRouterConstants.QR_CODE_GENERATION}
                    element={<QrCodeGeneration />}
                />
                <Route
                    path={AppRouterConstants.LINK_MANAGEMENT}
                    element={<LinkManagement />}
                />


                <Route path={AppRouterConstants.REGISTER} element={<SignUp />} />
                <Route path={AppRouterConstants.LOGIN} element={<SignIn />} />

                <Route path="*" element={<PageNotFoundWithIcons />} />

            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;

