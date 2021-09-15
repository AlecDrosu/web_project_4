# Project 4: Around The U.S.

### Overview

* Figma
* Images

**Figma**

* [Link to the project in Figma](https://www.figma.com/file/SurN1jaeEQIhuZEDMhmWWf/Sprint-4-Around-The-U.S.-desktop-mobile?node-id=0%3A1)

**Images**

The way you'll do this at work is by exporting images directly from Figma — we recommend doing that to practice more. Don't forget to optimize them [here](https://tinypng.com/), so your project loads faster. 

Have fun with JavaScript!

This is the finished product. It went quite smoothly with little serious problems. Something I did have trouble with though was Git. 
I created a develop branch but forgot to create feature branches in the develop branch. Because of this I just merged everything in
develop into main. This does not cause any problems since no one else
is working on this project, however I will make sure to use feature branches in the future. I am having some trouble with how to determine if the popup is open or not. I tried several things like determining if the style was display = 'flex', but this did not work. I instead make a condition where if the boxes are empty then they should be filled with the name. I am going to try to find out if there is a way to just add the content when a user clicks on the edit box.

link to GitHub pages: https://alecdrosu.github.io/web_project_4/

I did not know how much padding for the elements, so I chose 20px. I also figured it was unnecessary to use the (max-width: 880px) @media for .elements and .footer. I just changed the margin and width a bit so now there is padding. I did create the @media for the rest though. I also replaced the max-width: 575px with 650px, since I think it looks nicer with two columns on smaller screens.

**Animation**

This was very difficult and filled with bugs, but my github pages has it working well. I beleive the problem was caused by display flex not being on modal. For some reason when I fixed that, the normal code worked. (I tried using the 'all' in transition before, but it didn't work then for some reason).

