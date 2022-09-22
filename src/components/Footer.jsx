

function Footer() {
    return (
        <footer className="d-flex align-items-center">

            <nav className="d-flex  justify-content-around">
                <ul className="d-flex gap-5">
                    <li>
                        <a href="https://www.linkedin.com/in/alejo-veron-dev/" className="icon icon--linkedin">
                            <i className="fa fa-linkedin"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="icon icon--google">
                            <i className="fa fa-google"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/AleVeron" className="icon icon--github">
                            <i className="fa fa-github"></i>
                        </a>
                    </li>
                </ul>
                <p>Copyright Alejo Veron</p>
            </nav>

        </footer>
    )
}

export default Footer;