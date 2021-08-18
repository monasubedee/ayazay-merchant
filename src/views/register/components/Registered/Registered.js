import React from 'react';

const Popup = ({ message, closeclick, text }) => (

  <div>
    <div className="main_container">
      <div
        className="container"
        id="pop"
      >
        <div className="popup_container">
          <div className="popup_content">
            <div className="content_para">
              <h6>Please try again</h6>

              {message === 'Phone Number'?
                <p
                  style={{
                    color: 'red', fontSize: '20px', fontFamily: 'inherit', fontWeight: '800',
                  }}
                >
                  {message} is Suspended
                </p>: <p
                  style={{
                    color: 'red', fontSize: '20px', fontFamily: 'inherit', fontWeight: '800',
                  }}
                > {message} already Registered</p> }
              <h4>{text}</h4>
            </div>
            <div className="content_btn_container">
              <button
                className="content_btn"
                onClick={closeclick}
                to="/register/?form=1"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <style jsx>
      {
        `
        *{
            margin: 0;
            padding: 0;
        }

        a{
            text-decoration: none;
        }
        .main_container{
            position : fixed;
            width: 100%;
            height:100%;
            top:0;
            bottom:0;
            z-index: 999;
            left:0;
            background-color : rgba(0,0,0,0.5);
        }
        .container{
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Montserrat';
            width:95%;

        }

        .popup_container{
            border-radius:10px;
            display: flex;
            flex: 1 1;
            flex-direction: row;
            flex-wrap: wrap;
            background:#ffffff;
            max-width:500px;
            margin:0 auto;
            text-align:center;
        }
        .popup_content{
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            flex: 1;
            text-align:center;
            background-color: #ffffff;
            margin: 30px 20px 30px 20px;
        }

        .content_para>*{
            text-align:center;
            margin-bottom: 12px;
        }

        .content_para p{
            font-size: 13px;
            line-height: 1.57;
            color: #2d2d2d;
            margin-bottom: 12px;
        }
        .content_para span{
            font-size: 12px;
            line-height: 1.5;
            color: #7d7d7d;
        }
        .content_btn_container{
          display:flex;
          justify-content:space-around;
          margin-top:12px;
        }
        .content_btn{
            width:80%;
            text-align: center;
            border-radius: 8px;
            font-weight:600;
            background-color: #aa222a;
            padding: 17px;
            margin-bottom:10px;
            color:#ffffff;
            text-transform: uppercase;
            cursor:pointer;
        }

        @media(max-width:876px){
            .popup_img{
                display:none;
            }
            .popup_content{
                width:95%;
            }
            .content_btn{
               width:100%;
            }
            .container{
                width:60%;
            }
        }

        @media(max-width:576px){
           .container{
               width:90%;
           }
        }

        `
      }
    </style>
  </div>
);

export default Popup;
