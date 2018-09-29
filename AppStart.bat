if not "%minimized%"=="" goto :minimized
set minimized=true
@echo off

cd D:\Jeffrin-Workspace\$J\NodeJS
start /min cmd /C "node index.js"
