require("dotenv").config();
const FRONTEND_URL = process.env.FRONTEND_URL;

const welcomeEmail = (name) => {
  return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Welcome to social bee</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #FFD60A;
                color: #000000;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <div class="message">Welcome to Social bee !!</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>You have successfully registered with us. 
                   we are excited to have you as a participant!</p>
                <a class="cta" href="${FRONTEND_URL}">Go to Social bee</a>
            </div>
            <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                    href="mailto:profitmailservices@gmail.com">profitmailservices@gmail.com</a>. We are here to help! <br>Developed by ~ Uday Biswas ❤  </div>
        </div>
    </body>
    
    </html>`;
};

module.exports = welcomeEmail;
