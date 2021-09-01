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

**EMERGENCY CHANGES** It turned out that while I already submitted my project for the last review, I realised that I made a huge mistake, where I solved my overflow error by using 
*overflow: hidden* for the main page. I asked my tutor and realised this would be marked incorrect. I went back and changed most of the code in order to fix everything. I completely changed the widths of the profile and elements blocks, in order to adjust for the decrease page width. I also added a new block that combined the profile avatar and profile name, as this was the only way I could think of to solve the overflow of the profile block. I also made more breakpoints, in order to make the page look better on smaller devices. This was mostly just changing the grid to be 2 columns by 3 rows on devices closer to a tablet, while having it still be 1 column by 6 rows on phones, and 3 columns by 2 rows on computers.
