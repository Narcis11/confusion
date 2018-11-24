import React from 'react';
import { Media } from 'reactstrap';

function RenderLeaders({leaders}) {
    const leaderSection = leaders.map(leader => {
        return (
            <div className="row">
                <Media>
                    <div className="col-sm-2 col-md-2 col-lg-2">
                        <Media left href="#">
                            <Media object src={leader.image} alt="Generic placeholder image" />
                        </Media>
                    </div>
                    <div className="col-sm-10 col-md-10 col-lg-10">
                        <Media body>
                            <Media heading>
                                {leader.name}
                            </Media>
                                {leader.designation}
                                {leader.description}
                        </Media>
                    </div>
                </Media>
            </div>
        );
    });
  return (
     <div>
       {leaderSection}
     </div>
 )
}


function Leaders(props) {
    return (
        <div className="container"> 
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderLeaders leaders={props.leaders} />
                </div>
            </div>
        </div>
    );

}

export default Leaders;