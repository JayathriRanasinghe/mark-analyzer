import './Footer.css'
import Contact from './Contact.js'

export default function NavBar() {
    return(
        <div className='above'>
            <footer className='footer-above'>
                <div className='footer-nav' style={{ marginTop: '20px' }}>
                <section id='contact'>
                    <Contact />
                </section>
                </div>
                <div className='footer-sub' style={{ textAlign: 'center' }}>
                <p>
                    2023 PeraCom, All rights reserved.
                </p>
                </div>
            </footer>
        </div>
        
    )
}