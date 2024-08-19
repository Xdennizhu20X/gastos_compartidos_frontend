"use client";
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

export default function NavbarComponent() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { isAuthenticated, logout } = useAuth();
    const menuItemsAUt = [
            { name: "Dashboard", path: "/dashboard" },
            { name: "Grupos", path: "/groups" },
            { name: "Gastos", path: "/gastos" },
            { name: "Transacciones", path: "/trans" },
            { name: "Invitaciones", path: "/misinv" },
            { name: "Log Out", path: "/", onClick: logout }
        ];

    const menuItems = [
        { name: "Inicio", path: "/" },
        { name: "Nosotros", path: "/nosotros" },
        { name: "Iniciar Sesion", path: "/login" },
        { name: "Registrarse", path: "/register" },

    ];

    return (
        <Navbar shouldHideOnScroll isBlurred className="bg-transparent absolute text-white " onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent className="bg-transparent">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                {isAuthenticated ? (
                    <>
                    <Link to="/dashboard" className="flex flex-row items-center justify-center gap-1">
                    
                    <img src="https://i.ibb.co/bPN8RZB/2.png" alt=""  className="w-12 h-12" />
                    DivvyUp
                    <Link className="font-bold text-inherit" color="foreground" to="/dashboard">

                    </Link>
                    </Link>

                    </>
                ) : (
                    <>

                    <Link to="/" className="flex flex-row items-center justify-center gap-1">
                    <img src="https://i.ibb.co/bPN8RZB/2.png" className="w-12 h-12" alt="" />
                    <Link className="font-bold text-inherit" color="foreground" to="/">
                    
                    DivvyUp
                </Link>
                    </Link>

                    </>
                )}


                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {isAuthenticated ? (
                    <>


                        <NavbarItem>
                            <Link color="foreground" to="/groups">
                                Grupo
                            </Link>
                        </NavbarItem>
                        <NavbarItem isActive>
                            <Link to="/gastos" aria-current="page">
                                Gastos
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link color="foreground" to="/trans">
                                Transacciones
                            </Link>
                        </NavbarItem>
                        <NavbarItem isActive>
                            <Link to="/misinv" aria-current="page">
                                Invitaciones
                            </Link>
                        </NavbarItem>
                    </>
                ) : (
                    <>
                        <NavbarItem>
                            <Link color="foreground" to="/">
                                Inicio
                            </Link>
                        </NavbarItem>

                        <NavbarItem>
                            <Link color="foreground" to="/nosotros">
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
            {isAuthenticated ? (
                    <>
                {menuItemsAUt.map((item, index) => (
                    <NavbarMenuItem className={`bg-white/5 p-2 rounded-lg  text-white animate-fade-in-right`}
                        style={{ animationDelay: `${index * 100}ms` }} key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            to={item.path}
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
                    </>
                ) : (
                    <>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem className={`bg-white/5 p-2 rounded-lg  text-white animate-fade-in-right`}
                        style={{ animationDelay: `${index * 100}ms` }} key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            to={item.path}
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
                    </>
                )}

            </NavbarMenu>
        </Navbar>
    );
}
