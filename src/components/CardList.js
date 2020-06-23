import React from 'react';

//Import components to be used on this page
import CardItem from './CardItem';

const CardList = ({kittens}) => {
    return (
        <div className='container'>
            <center>
                {kittens.map((user, index) => 
                    <CardItem
                        key={kittens[index].id} 
                        id={kittens[index].id}
                        name={kittens[index].name}
                        email={kittens[index].email}
                    />
                    )
                }
            </center>
        </div>
    );
}

export default CardList;