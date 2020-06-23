import React from 'react';

//Import components to be used on this page
import CardItem from './CardItem';

const CardList = ({robots}) => {
    return (
        <div className='container'>
            <center>
                {robots.map((user, index) => 
                    <CardItem
                        key={robots[index].id} 
                        id={robots[index].id}
                        name={robots[index].name}
                        email={robots[index].email}
                    />
                    )
                }
            </center>
        </div>
    );
}

export default CardList;