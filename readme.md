
# SSOS


Shaa's Shitty Operating System (SSOS) is a purposely "crappy" but functional operating system (OS) 
implemented using vanilla HTML, CSS, and JavaScript.

 
## Current features
Currently, you can run SSOS, set up the OS, and create a user. You can also sign in to this user. The 
home screen (Unlocked) is already implemented, with near real-time updates (battery status, network 
indicator, and time in the menubar). Other components, like the application panel, have also been 
implemented, but are not fully functional.


## Planned features for the nearest future
```
------------------------------------------------------------------------------------------------------
| Feature                         | Fully Implemented? |  Partially Implemented?                     |
|-----------------------------------------------------------------------------------------------------
| - Single OS Instance            | Yes                |  -                                          |
| - Multiple Users                | No                 |  Yes (single user)                          |
| - Functional Application Panel  | No                 |  Yes (visually ready, but not functionally) |
| - Window Management             | No                 |  No                                         |
| - Signout Functionality         | No                 |  No                                         |
| - Shaabrowser (Default)         | No                 |  No                                         |
| - Other built-in software's     | No                 |  No                                         | 
|-----------------------------------------------------------------------------------------------------
```

## Run SSOS
You will need the following to run SSOS: `npm`, `Node 16+`, and `a web browser`.
SSOS is currently in development and does not yet have a production-ready distribution. To run it
'like that,' follow the steps below:

Clone the repo: 
```bash
git clone https://github.com/shaa403/ssos.git
```
this will clone the dev branch of this project. A production-ready distribution of this OS will be published 
using GitHub's releases, and the raw codebase will be stored in the main branch.

Navigate to the cloned repo and run:
```bash
npm install
```
this will install the external dependencies used in this project.

After installation, run:
```bash
npm start
```
to start running SSOS. please note that only one instance of SSOS can be active at a time. If you try 
running `npm start` in a new terminal session, you will receive a message notifying you that only one 
instance of SSOS is allowed.

Run :
```bash
npm run ssbfree
```
to destroy the current instance of SSOS. To avoid the hassles described above, always start SSOS using:
```bash
npm run ssbfree
npm start
```
this approach is recommended if you're looking to contribute to the project, as it will require rapid 
restarts.

For Linux and macOS users, you can streamline this syntax even further by using the following instead:
```
npm run ssbfree && clear && npm start
```

## Showcase



## Definations
- When this document mentions that SSOS can only run one instance, it doesn’t mean you can only run it on 
  a single tab. You can run SSOS on multiple tabs, as long as you’re signed in as distinct users. The 
  limitation of a single instance is to prevent conflicts between files and directories.


## Want to contribute to SSOS?
For development, simply follow the instructions above for starting and restarting the SSOS instance. 
Read the **commit guide** in `contrib/commit_guide.md` to understand how commits MUST be made.

It's recommended to go through the codebase and commit history to familiarize yourself with the overall 
structure.

It's best to work with the existing planned features rather than proposing new functionalities.
