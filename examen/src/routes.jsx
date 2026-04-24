import {
    createRootRoute,
    createRoute,
    createRouter,
    Outlet,
} from "@tanstack/react-router";

import Home from "./Components/Home";
import CarParts from "./Components/CarParts";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const rootRoute = createRootRoute({
    component: function RootLayout () {
        return (
            <>
                <Navbar />
                <section id="center">
                    <Outlet />
                </section>
                <Footer />
                </>
            );
        }
    });

    const homeRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: "/",
        component: Home,
    });

    const carPartsRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: "/car-parts",
        component: CarParts,
    });

    const routeTree = rootRoute.addChildren([
        homeRoute, 
        carPartsRoute
    ]);

    export const router = createRouter({
        routeTree,
    });