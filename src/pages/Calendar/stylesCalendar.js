import styled from 'styled-components'




export const StyleWrapper = styled.div`
.fc-button.fc-next-button.fc-button-primary{
  background: 0;
  border: 0;

}

.fc-button.fc-prev-button.fc-button-primary{
    background: 0;
    border: 0;
    
}

.fc-toolbar-title{
    text-transform:  capitalize;
    font-size: 24px;
    letter-spacing: 0.04em;
}

  .fc-icon-chevron-left:before {
    color: black;
}
.fc-icon-chevron-right:before {
    color: black;
}


tr{
    border-radius: 8px;
}

.fc-day{
    text-transform: capitalize
 
   
}
.fc, .fc-scrollgrid-liquid{
    border-radius: 10px;
}

.fc-col-header-cell-cushion{
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    padding-top: 9px;
    padding-bottom: 8px;
}

.fc-daygrid-day-number {
  
    margin: 0px auto;
    font-weight: 400;
font-size: 18px;
line-height: 22px;
color: #000000;


}

.fc .fc-daygrid-more-link {
    font-weight: 600;
font-size: 15px;
line-height: 120%;
letter-spacing: 0.04em;

color: #000000;

}

.fc-daygrid-day-top{
    max-height: 18px;
}

.fc-daygrid-day-events {
    margin-top: 20px;
}

.fc-col-header-cell-cushion {
    display:block;
}

.fc-col-header{
    border-radius: 8px;
}

tr {
    
    border-radius: 8px;
}

.fc-col-header .fc-day-sun{
    background:  #FCC8C8;
    border-top-left-radius: 8px;
    
   
}

.fc-col-header .fc-day-sat{
    background:  #FCC8C8;
    border-top-right-radius: 8px;
    border-collapse: collapse;
   
}
.fc-col-header{
    background:  #C9F9C8;
}

.fc-view-harness {
    margin-bottom:  44px;
}
  
//Styles today

 }
.fc-day-today {
    background-color:inherit !important;
    color: white !important;
}

.fc-day.fc-day-today {
    position: relative; 
}

.fc-day.fc-day-today::before,
.fc-day.fc-day-today::after {
    content: '';
    margin: 0px auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    color: white !important;
    border-color: transparent;
    border-style: solid;
  
}   

.fc-daygrid-day-number {
    color: #000000;
}


.fc-day.fc-day-today::before {
    border-width: 1.5em;
}

.fc-day.fc-day-today::after {
    border-radius: 0;
    width: 36px;
height: 36px;
background: #5B73CE;
border-radius: 50%;

}
.fc-theme-standard td{
    border: 1px solid #F2F2F2;
}
.fc-scrollgrid{
    border: 1px solid #F2F2F2;
 

}


.fc, .fc-daygrid-more-link{
    color: black;
}


table{
    position: relative;
}

 .fc-popover-header{
    background: white;
    position: relative;
    z-index: 10;
    color: black;
  
}



.fc-popover-header {
    border-radius: 10px;
}
.fc-popover-body{
    border-radius: 10px;
}

.fc-popover-body {
    background: white;
    position: relative;
    z-index: 10;
    color: black;
}

table{
    width: 100%;
}





.fc .fc-button {

    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding:  0; 
  
}


.fc-button.fc-prev-button.fc-button-primary{
    @media (max-width: 512px) {
        position: absolute;
   
        right: 40px;
        color: red;
    }

}


.fc-button.fc-next-button.fc-button-primary{
    @media (max-width: 512px) {
        position: absolute;
        right: 0px;
    }

}


.fc-popover{
    box-shadow: 0 2px 6px rgb(0 0 0 / 80%);
    width: 50%;
    border-radius: 10px;
    // margin-top:50px;
    position: absolute;
    background: ffffff;
    top: 7%;
    left: 25%;
    border: 1px solid #F2F2F2;
    border-radius: 10px;
    @media (max-width: 472px) {
        width:  80%;
       
        top: 7%;
        left: 5%;
        border: 1px solid #F2F2F2;
        border-radius: 10px;
    }
}







`
