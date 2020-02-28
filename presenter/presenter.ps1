# powershell.exe -nologo -noninteractive -windowStyle hidden -command "C:\script.ps1"

$serverAddress = 'http://localhost:3000/api/update'

$wc = New-Object System.Net.WebClient

while($true) {
	$wc.DownloadString($serverAddress)
	Start-Sleep -s 60
}