# Dicentra (Frontend)

<div align="center"><img src="https://github.com/TyrelN/dicentra-frontend/blob/main/src/assets/nvars-logo-light.svg" width="300"/></div>

## About
Dicentra is a full-stack website designed for Nicola Valley Animal Rescue. The website acts as a platform for applications (to adopt, foster or volunteer), animal education, donations and more. This repo holds the single page application side of the project.

Visit the website [here](https://www.nvars.ca/).

View a showcase of the content management features [here](https://www.youtube.com/watch?v=vcnvZttQCXQ).

## Design Choices
Reducing redundancy and creating a simple architecture while utilizing some of the interesting UI components from Quasar has proved challenging. Here are some of the design decision highlights:
* To better facilitate active updates to posts and data, every page involving backend data has optional admin commands and pages for volunteers who are logged in. Volunteers can update, delete, or create new posts for animals and articles. In addition, all applications can be accepted or rejected and be reviewed later based on verdict.
* Application form questions were abstracted away to a seperate javascript file, both the questions on the form and the questions in the application detail page use this file to read the questions, and then match those questions with the request data for each application from the backend. While increasing the complexity of the implementation, this structure reduced the redundancy of changing questions for large forms to a single object, and reduced the areas that would need changing if the question amount or types had to change.
* The specific forms for adoption, fostering and volunteering are added to a single file component 'forms' as imported components. When the form is submitted, the data from these imported forms is parsed into a json form that can easily be iterated on, then added on top of the contact details information to a form object that is submitted to the backend. This implementation allows for a more streamlined user experience with forms while also managing data consolidation between various components.
* To improve the user experience with applying, field inputs are saved on the browser client and loaded each time to user revisits the page. Inputs are deleted upon successfully submitting the application.
* Since affordable hosting platforms for backend servers have to wake up from sleep (Heroku) or have lower cpu and network resources, a cat stretching loading animation was created for frontend sections where requested data is awaited.


## Caveats
There are some areas of the design that should be noted with scrutiny:
* While the single page application itself loads very quickly, the backend is deployed on Heroku using a free dyno, which falls asleep when there is no activity. When the dyno needs to wake up, it can lead to long loading times for sections requesting data (10 seconds on average). To alleviate this, a cat loading animation has been added to sections that rely on data.
* The backend error logging within forms is a little rough around the edges. 400 status errors are generated as red text at the bottom of forms, but all other error messaging is covered as an alert and does not have robust coverage.
* Critical business logic would benefit from unit testing, which is underway. The codebase has undergone numerous rewrites to improve code structure. Automated testing will further improve the maintainability and stability of the project.


## Additional Notes:
* The frontend project is deployed on [Vercel](https://vercel.com/).
* The logo was designed by Tyrel Narciso. All rights reserved.


## References and Resources
* https://www.youtube.com/watch?v=Yg5zkd9nm6w
* https://quasar.dev/
* https://v3.vuejs.org/
* https://router.vuejs.org/

