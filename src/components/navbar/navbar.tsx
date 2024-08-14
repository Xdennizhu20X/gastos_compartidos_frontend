"use client";
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

export default function NavbarComponent() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { isAuthenticated, logout } = useAuth();

    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    return (
        <Navbar shouldHideOnScroll isBlurred className="bg-transparent absolute text-white " onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent className="bg-transparent">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit">DivvyUp</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {isAuthenticated ? (
                    <>
                        <NavbarItem>
                        <Link color="foreground" to="/xd">
                            Grupo
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link to="#" aria-current="page">
                            Gastos
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" to="#">
                            Integrations
                        </Link>
                    </NavbarItem>
                    </>
                    ) : (
                    <>
                        <NavbarItem>
                            <Link color="foreground" to="/xd">
                                Inicio
                            </Link>
                        </NavbarItem>
                        <NavbarItem isActive>
                            <Link to="#" aria-current="page">
                                Gastos
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link color="foreground" to="#">
                                Nosotros
                            </Link>
                        </NavbarItem>
                    </>
                    )}
                
            </NavbarContent>
            <NavbarContent justify="end">
                        {isAuthenticated ? (
                    <>
                        <NavbarItem>
                            <Button as={Link} onClick={logout} color="primary" to="#" variant="flat">
                                Log Out
                            </Button>
                        </NavbarItem>
                    </>
                    ) : (
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Link to="/login">Login</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="primary" to="/register" variant="flat">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                    )}

            </NavbarContent>
            <NavbarMenu className="bg-transparent">
                {menuItems.map((item, index) => (
                    <NavbarMenuItem className={`bg-white/5 p-2 rounded-lg  text-white animate-fade-in-right`}
                    style={{ animationDelay: `${index * 100}ms` }} key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            to="#"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
