import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home";
import PageNotFoundWithIcons from "../page-not-found/PageNotFoundWithIcons";
import LayoutHoc from "../../layouts/Layout";
import AboutUs from "../../pages/aboutUs/AboutUs";
import { AppRouterConstants } from "./AppRouter.contants";
import { QrCodeGeneration } from "../../pages/qr-code-generation/QrCodeGeneration";
import { LinkManagement } from "../../pages/link-management/LinkManagement";

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
                <Route path="*" element={<PageNotFoundWithIcons />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;

