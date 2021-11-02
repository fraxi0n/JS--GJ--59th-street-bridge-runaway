/*==============================================================================
Load Banks Example
Copyright (c), Firelight Technologies Pty, Ltd 2012-2021.

This example demonstrates loading banks via file, memory, and user callbacks.

The banks that are loaded are:

* SFX.bank (file)
* Music.bank (memory)
* Vehicles.bank (memory-point)
* VO.bank (custom)

The loading and unloading is asynchronous, and we displays the current
state of each bank as loading is occuring.

### See Also ###
* Studio::System::loadBankFile
* Studio::System::loadBankMemory
* Studio::System::loadBankCustom
* Studio::Bank::loadSampleData
* Studio::Bank::getLoadingState
* Studio::Bank::getSampleLoadingState
* Studio::Bank::getUserData
* Studio::Bank::setUserData
==============================================================================*/

//==============================================================================
// Prerequisite code needed to set up FMOD object.  See documentation.
//==============================================================================
                    // Calling the constructor function with our object

//==============================================================================
// Example code
//==============================================================================
var FMOD = {};
FMOD['preRun'] = prerun;
FMOD['onRuntimeInitialized'] = main;
FMOD['INITIAL_MEMORY'] = 80*1024*1024;
FMODModule(FMOD);  

var gSystem;                            // Global 'System' object which has the Studio API functions.
var gSystemCore;                        // Global 'SystemCore' object which has the Core API functions.
var BANK_COUNT = 2;
var BANK_NAME = [
    "SFX.bank",
    "Music.bank"
];

var musicInstance = {};
var cursorInstance = {};
var explosionInstance = {};
var signalInstance = {};
var obstacleInstance = {};
var fadeOutID;

var gBank = [ null, null];
var gWantBankLoaded = [ false, false];
var gWantSampleLoad = true;
var gAudioResumed  = false;             // Boolean to avoid resetting FMOD on IOS/Chrome every time screen is touched.

// Simple error checking function for all FMOD return values.
function CHECK_RESULT(result)
{
    if (result != FMOD.OK)
    {
        var msg = "Error!!! '" + FMOD.ErrorString(result) + "'";

        alert(msg);

        throw msg;
    }
}

// Will be called before FMOD runs, but after the Emscripten runtime has initialized
// Call FMOD file preloading functions here to mount local files.  Otherwise load custom data from memory or use own file system. 
function prerun() 
{
    var fileUrl = "./banks/";
    var fileName;
    var folderName = "/";
    var canRead = true;
    var canWrite = false;

    fileName = [
        "Master.bank",
        "Master.strings.bank",
        "Music.bank",
        "SFX.bank"
    ];

    for (var count = 0; count < fileName.length; count++)
    {
        FMOD.FS_createPreloadedFile(folderName, fileName[count], fileUrl + fileName[count], canRead, canWrite);
    }
}

// Called when the Emscripten runtime has initialized
function main()
{
    // A temporary empty object to hold our system
    var outval = {};
    var result;

    console.log("Creating FMOD System object\n");

    // Create the system and check the result
    result = FMOD.Studio_System_Create(outval);
    CHECK_RESULT(result);

    console.log("grabbing system object from temporary and storing it\n");

    // Take out our System object
    gSystem = outval.val;

    result = gSystem.getCoreSystem(outval);
    CHECK_RESULT(result);

    gSystemCore = outval.val;
    
    // Optional.  Setting DSP Buffer size can affect latency and stability.
    // Processing is currently done in the main thread so anything lower than 2048 samples can cause stuttering on some devices.
    console.log("set DSP Buffer size.\n");
    result = gSystemCore.setDSPBufferSize(2048, 2);
    CHECK_RESULT(result);
    
    // Optional.  Set sample rate of mixer to be the same as the OS output rate.
    // This can save CPU time and latency by avoiding the automatic insertion of a resampler at the output stage.
    // console.log("Set mixer sample rate");
    // result = gSystemCore.getDriverInfo(0, null, null, outval, null, null);
    // CHECK_RESULT(result);
    // result = gSystemCore.setSoftwareFormat(outval.val, FMOD.SPEAKERMODE_DEFAULT, 0)
    // CHECK_RESULT(result);

    console.log("initialize FMOD\n");

    // 1024 virtual channels
    result = gSystem.initialize(1024, FMOD.STUDIO_INIT_NORMAL, FMOD.INIT_NORMAL, null);
    CHECK_RESULT(result);
    
    // Starting up your typical JavaScript application loop
    console.log("initialize Application\n");

    initApplication();

    // Set up iOS/Chrome workaround.  Webaudio is not allowed to start unless screen is touched or button is clicked.
    function resumeAudio() 
    {
        if (!gAudioResumed)
        {
            console.log("Resetting audio driver based on user input.");

            result = gSystemCore.mixerSuspend();
            CHECK_RESULT(result);
            result = gSystemCore.mixerResume();
            CHECK_RESULT(result);

            gAudioResumed = true;
        }

    }

    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (iOS)
    {
        window.addEventListener('touchend', resumeAudio, false);
    }
    else
    {
        document.addEventListener('click', resumeAudio);
    }

    // Set the framerate to 50 frames per second, or 20ms.
    console.log("Start game loop\n");

    window.setInterval(updateApplication, 20);

    return FMOD.OK;
}

function customFileOpen(name, filesize, handle, userdata)
{
    var filesize_outval = {};
    var handle_outval = {}
    
    // We pass the filename into our callbacks via userdata in the custom info struct
    var filename = userdata;

    var result = FMOD.file_open(gSystemCore, filename, filesize_outval, handle_outval)
    if (result == FMOD.OK)
    {
        filesize.val = filesize_outval.val;
        handle.val = handle_outval.val;
    }

    return result;
}

function customFileClose(handle, userdata)
{
    return FMOD.file_close(handle);
}

function customFileRead(handle, buffer, sizebytes, bytesread, userdata)
{
    var bytesread_outval = {};
    var buffer_outval = {};

    // Read from the file into a new buffer.  This part can be swapped for your own file system.
    var result = FMOD.file_read(handle, buffer_outval, sizebytes, bytesread_outval)   // read produces a new array with data.
    if (result == FMOD.OK)
    {
        bytesread.val = bytesread_outval.val;
    }

    // Copy the new buffer contents into the buffer that is passed into the callback.  'buffer' is a memory address, so we can only write to it with FMOD.setValue
    for (count = 0; count < bytesread.val; count++)
    {
        FMOD.setValue(buffer + count, buffer_outval.val[count], 'i8');      // See https://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html#accessing-memory for docs on setValue.
    }

    return result;
}

function customFileSeek(handle, pos, userdata)
{
    return FMOD.file_seek(handle, pos)
}


function loadBank(name)
{
    var bankhandle = {};
    CHECK_RESULT( gSystem.loadBankFile("/" + name, FMOD.STUDIO_LOAD_BANK_NORMAL, bankhandle) );
}

// Helper function to load a bank by name.
function pressButton(method)
{
    if (method < 4)
    {
        // Toggle bank load, or bank unload
        if (!gWantBankLoaded[method])
        {
            CHECK_RESULT(loadBank(method));
            gWantBankLoaded[method] = true;
        }
        else
        {
            CHECK_RESULT(gBank[method].unload());
            gWantBankLoaded[method] = false;
        }
    }
    else
    {
         gWantSampleLoad = !gWantSampleLoad;
    }
    return FMOD.OK;
}

//
// Callback to free memory-point allocation when it is safe to do so
//
function studioCallback(system, type, commanddata, userdata)
{
    if (type == FMOD.STUDIO_SYSTEM_CALLBACK_BANK_UNLOAD)
    {
        // For memory-point, it is now safe to free our memory
        // The C version would free memory here.  In JS we won't do this.
        var bank = commanddata;
        var outval = {}

        CHECK_RESULT(bank.getUserData(outval));

        console.log("BANK_UNLOAD");
    }
    return FMOD.OK;
}


//
// Helper function to return state as a string
//
function getLoadingStateString(state, loadResult)
{
    switch (state)
    {
        case FMOD.STUDIO_LOADING_STATE_UNLOADING:
            return "unloading  ";
        case FMOD.STUDIO_LOADING_STATE_UNLOADED:
            return "unloaded   ";
        case FMOD.STUDIO_LOADING_STATE_LOADING:
            return "loading    ";
        case FMOD.STUDIO_LOADING_STATE_LOADED:
            return "loaded     ";
        case FMOD.STUDIO_LOADING_STATE_ERROR:
            // Show some common errors
            if (loadResult == FMOD.ERR_NOTREADY)
            {
                return "error (rdy)";
            }
            else if (loadResult == FMOD.ERR_FILE_BAD)
            {
                return "error (bad)";
            }
            else if (loadResult == FMOD.ERR_FILE_NOTFOUND)
            {
                return "error (mis)";
            }
            else
            {
                return "error      ";
            }
        default:
            return "???";
    };
}

//
// Helper function to return handle validity as a string.
// Just because the bank handle is valid doesn't mean the bank load
// has completed successfully!
//
function getHandleStateString(bank)
{
    if (bank == null)
    {
        return "null   ";
    }
    else if (!bank.isValid())
    {
        return "invalid";
    }
    else
    {
        return "valid  ";
    }
}

// Called from main, does some application setup.  In our case we will load some sounds.
function initApplication() 
{
    loadBank("Master.bank");
    loadBank("Master.strings.bank");
    loadBank("Music.bank");
    loadBank("SFX.bank");

    var musicDescription = {};
    CHECK_RESULT( gSystem.getEvent("event:/music", musicDescription) );
    
    CHECK_RESULT( musicDescription.val.createInstance(musicInstance) );

    var cursorDescription = {};
    CHECK_RESULT( gSystem.getEvent("event:/cursor", cursorDescription) );
    
    CHECK_RESULT( cursorDescription.val.createInstance(cursorInstance) );
    
    var signalDescription = {};
    CHECK_RESULT( gSystem.getEvent("event:/signal", signalDescription) );
    
    CHECK_RESULT( signalDescription.val.createInstance(signalInstance) );

    var obstacleDescription = {};
    CHECK_RESULT( gSystem.getEvent("event:/obstacle", obstacleDescription) );
    
    CHECK_RESULT( obstacleDescription.val.createInstance(obstacleInstance) );

    var explosionDescription = {};
    CHECK_RESULT( gSystem.getEvent("event:/explosion", explosionDescription) );
    
    CHECK_RESULT( explosionDescription.val.createInstance(explosionInstance) );

    var paramDesc = {};
    CHECK_RESULT( musicDescription.val.getParameterDescriptionByName("EndGame", paramDesc) );
    fadeOutID = paramDesc.id;
    
    
    CHECK_RESULT( gSystem.setCallback(studioCallback, FMOD.STUDIO_SYSTEM_CALLBACK_BANK_UNLOAD) );
}

// Called from main, on an interval that updates at a regular rate (like in a game loop).
// Prints out information, about the system, and importantly calles System::udpate().
function updateApplication() 
{
    var dsp = {};
    var stream = {};
    var update = {};
    var total = {};
    var result;
    var i;
    var outval = {};
    
    // Load bank sample data automatically if that mode is enabled
    // Also query current status for text display
    var loadStateResult   = [ FMOD.OK, FMOD.OK, FMOD.OK, FMOD.OK ];
    var sampleStateResult = [ FMOD.OK, FMOD.OK, FMOD.OK, FMOD.OK ];
    var bankLoadState     = [ FMOD.STUDIO_LOADING_STATE_UNLOADED, FMOD.STUDIO_LOADING_STATE_UNLOADED, FMOD.STUDIO_LOADING_STATE_UNLOADED, FMOD.STUDIO_LOADING_STATE_UNLOADED ];
    var sampleLoadState   = [ FMOD.STUDIO_LOADING_STATE_UNLOADED, FMOD.STUDIO_LOADING_STATE_UNLOADED, FMOD.STUDIO_LOADING_STATE_UNLOADED, FMOD.STUDIO_LOADING_STATE_UNLOADED ];
    for (i=0; i<BANK_COUNT; ++i)
    {
        if (gBank[i] && gBank[i].isValid())
        {
            loadStateResult[i] = gBank[i].getLoadingState(outval);
            if (outval && outval.val)
            {
                bankLoadState[i] = outval.val;
            }
        }
        if (bankLoadState[i] == FMOD.STUDIO_LOADING_STATE_LOADED)
        {
            sampleStateResult[i] = gBank[i].getSampleLoadingState(outval);
            if (outval && outval.val)
            {
                sampleLoadState[i] = outval.val;
            }

            if (gWantSampleLoad && sampleLoadState[i] == FMOD.STUDIO_LOADING_STATE_UNLOADED)
            {
                CHECK_RESULT(gBank[i].loadSampleData());
            }
            else if (!gWantSampleLoad && (sampleLoadState[i] == FMOD.STUDIO_LOADING_STATE_LOADING || sampleLoadState[i] == FMOD.STUDIO_LOADING_STATE_LOADED))
            {
                CHECK_RESULT(gBank[i].unloadSampleData());
            }
        }
    }

    result = gSystemCore.getCPUUsage(dsp, stream, null, update, total);
    CHECK_RESULT(result);

    var channelsplaying = {};
    result = gSystemCore.getChannelsPlaying(channelsplaying, null);
    CHECK_RESULT(result);

    var numbuffers = {};
    var buffersize = {};
    result = gSystemCore.getDSPBufferSize(buffersize, numbuffers);
    CHECK_RESULT(result) 

    var rate = {};
    result = gSystemCore.getSoftwareFormat(rate, null, null);
    CHECK_RESULT(result);

    var sysrate = {};
    result = gSystemCore.getDriverInfo(0, null, null, sysrate, null, null);
    CHECK_RESULT(result);
    
    var ms = numbuffers.val * buffersize.val * 1000 / rate.val;

    // Update FMOD
    result = gSystem.update();
    CHECK_RESULT(result);
}
