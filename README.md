# Care for heart ♥️♥️
An react native expo project for quick cardiovescular risk diagnosis.
### Dependencies: 
- `react-native` Main framework.
- `expo` Main framework.
- `expo-linear-gradient` Making an component with graident color.
- `expo-font` Loading and injecting custom fonts into application.
- `react-native-reanimated` Main framework for app animation.
- `react-native-gesture-handler` Gesture Handling.
- `expo-localization` Handle localization & language.
- `expo-router` Path routing.
- `expo-status-bar` Handle system status bar.

## Edit and run the app locally:
### Pre-requisites
 - `nodejs.`
 - `expo CLI`
 - `expo go` ( For running app with mobile devices pre-compilation)
### Installation
 1. Clone this repositories on your local devices.
 ```
 git clone https://github.com/siatoes2550/Heart-Disease-App/(https://github.com/siatoes2550/Heart-Disease-App.git)
 ```
 2. Navigate to project directories on your local devices.
 3. Install all necessary library/package.
 ```
 npm install
 ```
 4. Modify any source code to your liking
 5. To run app on testing environment, place this command into your terminal ( Make sure that cd is on the app root directories )
 ```
 npm start
 ```

 >[!IMPORTANT]
 >To access google sheet function, you must create an .env file on project root directories and paste the following data:
 ```
 EXPO_PUBLIC_APIKEY: "INSERT_HERE" //Your backend api access key.
 EXPO_PUBLIC_DATA_SERVER: "https://example.app/" //Link to your API data server
 ```

> [!CAUTION]
> Current known issues:
>  - Theming is janky and will only apply on the first page load.
>  - Invalid hook call error are pretty common.

## Export && publising an application
### Exporting && deploying to web 
 1. First, Run this following command on your terminal,
    ```
    npm expo export -p web
    ```
 2. Your compiled web deployment should be located on the "/dist/" directories,
 3. ( optional ) test your deployment with the command ``` npx expo serve ```
 4. Now to deploy to web host, The method are different for each hosting provider ( Read more at https://docs.expo.dev/guides/publishing-websites/ )
    For this instruction, We'll be using Vercel as our hosting provider.
    
       4.1.Install vercel CLI
       ```
       npm install -g netlify-cli
       ```
       4.2.Create ```vercel.json``` file at your root directories and paste the following
       ```
       {
        "buildCommand": "expo export -p web",
        "outputDirectory": "dist",
        "devCommand": "expo",
        "cleanUrls": true,
        "framework": null,
        "rewrites": [
          {
           "source": "/(.*)",
           "destination":"/index.html"
          }
        ]
      }
       ```
       4.3. To deploy, run the following command in your terminal
       ```
       vercel
       ```
       4.4. To update deployment into production build, run the following command in your terminal
       ```
       vercel --prod
       ```
       
### Export && Deploy to mobile
  
