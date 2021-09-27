import React from 'react';

function Footer() {
    const icons = [
        {
            name: "fas fa-home",
            link: "/"
        },
      
    ]

    return (
        
            <footer >
                    <div className="col-lg-8 mx-auto text-center">
                        {icons.map(icon =>
                            (<a href={icon.link} key={icon.name} target="_blank" rel="noopener noreferrer"><i className={icon.name}></i></a>)
                            )}
                    </div>
            </footer>
        
    )
}

export default Footer;