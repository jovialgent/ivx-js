$workingDir = (Get-Location).Path
$storybuilderDir = "$workingDir\influence\story-player"

# Install Node Modules for Story Builder
cd $storybuilderDir 
npm install

# Create directory and it's assets for running the story player locally.
npm run local-build

# Set-Up Website for iVX.StoryPlayer if it doesn't exist.
if ((Get-Website -Name 'iVX.StoryPlayer').Count -eq 0)
{
    New-Website -Name 'iVX.StoryPlayer' -Port 80 -HostHeader 'storyplayer.local.inf-env.com' -PhysicalPath "$storybuilderDir\local-build"
}

cd $workingDir 