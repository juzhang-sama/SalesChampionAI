@echo off
echo ========================================
echo 销冠AI教练项目启动脚本
echo ========================================
echo.

echo 1. 检查Node.js版本...
node --version
if %errorlevel% neq 0 (
    echo 错误：Node.js未安装或未配置到PATH
    pause
    exit /b 1
)

echo.
echo 2. 安装项目依赖...
npm install
if %errorlevel% neq 0 (
    echo 错误：依赖安装失败
    pause
    exit /b 1
)

echo.
echo 3. 设置Android SDK路径...
echo sdk.dir=F:\\Android > android\local.properties

echo.
echo 4. 启动Metro开发服务器...
echo 请在新窗口中运行以下命令：
echo npx react-native start
echo.
echo 5. 构建Android应用...
echo 请在新窗口中运行以下命令：
echo cd android
echo ./gradlew assembleDebug
echo.
echo 6. 安装到设备...
echo 将生成的APK文件安装到手机：
echo android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo ========================================
echo 项目启动完成！
echo ========================================
pause 