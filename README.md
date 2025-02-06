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

 [!IMPORTANT]
 To access google sheet function, you must create an .env file on project root directories and paste the following data:
 ```
 EXPO_PUBLIC_APIKEY: "INSERT_HERE" //Your backend api access key.
 EXPO_PUBLIC_DATA_SERVER: "https://example.app/" //Link to your API data server
 EXPO_PUBLIC_DATA_SERVERRATE: "https://example.app/getdata"
 ```


