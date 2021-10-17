import React from 'react'

export const PrivacityHome = () => {
    return (
        <article>
            <h3>Informacion que Journal Recolecta de usted</h3>
            <p>Journal recolecta informacion que usted nos proporciono a travez de nuestra aplicacion como:</p>
            <ul>
                <li>Direccion de correo electronico</li>
                <li>Nombre de usuario</li>
                <li>Colleciones de texto que usted crea dentro de nuestra aplicacion las cuales usted tiene total control
                de crear editar o suprimir.</li>
            </ul>
            <h3>¿Á donde van sus datos?</h3>
            <p>Los datos de los usuarios son almacentados en la base de datos firestore de firebase, que es propiedad de google.</p>
        </article>
    )
}
