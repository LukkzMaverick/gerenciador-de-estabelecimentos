import React, { useContext, Fragment, useState, useEffect } from 'react'
import { Navbar as NavbarBootstrap, NavDropdown, Nav } from 'react-bootstrap';
import { removeToken, getUser } from '../../config/auth';
import history from '../../config/history';
import LoginContext from '../../context/LoginContext';
const Navbar = (props) => {
    const login = useContext(LoginContext)
    const[username,setUsername] = useState('')
    useEffect(() => {
        const user = getUser()
        if(user){
            setUsername(user.nome)
        }
      return () => {};
    }, [login.isLogged])
    function logout() {
        removeToken()
        login.setIsLogged(false)
        history.push('/')
    }
    function goToHome() {
        history.push('/')
    }

    function goToLoginPage(){
        console.log('indo')
        history.push('/login')
    }

    function goToRegisterPage(){
        console.log('indo')
        history.push('/register')
    }

    function goToCadastrarEstabelecimentos(){
        history.push('/cadastrarEstabelecimentos')
    }

    function goToBuscaPorLocalizacao(){
        history.push('/buscaPorLocalizacao')
    }

    return (
        <>

            <header>
                <NavbarBootstrap bg="primary" variant='dark' expand="lg">
                    <div className='container'>
                        <NavbarBootstrap.Brand>Gerenciador de Estabelecimentos</NavbarBootstrap.Brand>
                        <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />
                        <NavbarBootstrap.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                {login.isLogged ? (<Fragment>
                                    <Nav.Link onClick={goToHome}>Home</Nav.Link>
                                <NavDropdown title={username} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={goToCadastrarEstabelecimentos}>
                                    Cadastrar Estabelecimentos</NavDropdown.Item>
                                    <NavDropdown.Item onClick={goToBuscaPorLocalizacao}>Busca por Localização</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logout}>Sair</NavDropdown.Item>
                                </NavDropdown>
                                </Fragment>) : <Fragment>
                                    <Nav.Link onClick={goToLoginPage}>Login</Nav.Link>
                                    <Nav.Link onClick={goToRegisterPage}>Cadastre-se</Nav.Link>
                                </Fragment>}
                            </Nav>
                        </NavbarBootstrap.Collapse>
                    </div>
                </NavbarBootstrap>
            </header>

        </>
    )
}

export default Navbar
