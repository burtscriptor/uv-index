# Where's the Uv rating at?

## Purpose
My fiance, who takes amazing care of her skin, constantly asks me "are the UV's high today?", she's very UV/sun conscience because over exposure can cauess skin winkles not to mention cancer. 
To address this question and have a ready answer, I created "Where's the Uv rating at?".

## What it does
A Javascript create-react-app deployed on Heroku, on page load the application asks user premission to access their geolocation, if given, the location is sent to
an API that responds with the current UV index and a forecast for the location provided. This informatin is then neatly displayed back to the user in an easy to digest
nature. The severtiy of the UV rating is colour coded inline with the Cancer Council of Australia standards. Small icons are used to indicate what protective measures should be used 
depending on severity, the level of protection is also in accordance with the Cancer Council of Australia. A graph is used to display the forecast 12 hours in advance. 

<img width="634" alt="UV" src="https://github.com/user-attachments/assets/72b46fa5-0fe8-45c9-8377-e82238ee6fae">

## Problems and solutions
It took a fair bit of tinkering to get the layout to a standard I was happy with. It is however still not perfect.

## Proud of
I'm pretty happy with the CSS. I used display: grid; because when I look at many websites and I wonder how did they achieve this layout? And I think they must have used 
display:grid; 
What I like about display: grid; is the precise control over rows and columns. This helps to align multiple items and make asymetical layouts that are dynamic and responsive.

Theres a slider bar that allows the user to adjust the UV level, this is so they can experience the changes in the user experience depending on the UV serevity.

## Improvements
The CSS and layout are not perfect, for example on some platforms the title sits flush to the top of the viewport.
The responsivness of the layout is deadful.
It would be great if the background colour changed as well inline with the UV servity, I didn't think of that before but it wouldn't be to hard to implement.

I think website responsivness is where my next efforts should be directed.


