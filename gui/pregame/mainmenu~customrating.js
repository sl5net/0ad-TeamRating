function customratingvanilla_initCheck()
{
    let state = {
        "needsRestart": false,
        "reasons": new Set(),
        "showReadme": false
    };

    let configSaveToMemoryAndToDisk = (key, value) =>
    {
        Engine.ConfigDB_CreateValue("user", key, value);
        Engine.ConfigDB_WriteValueToFile("user", key, value, "config/user.cfg");
    }

    
    
    {
        let settings = Engine.ReadJSONFile("customrating_data/default_config.json");
       
        // Normal check. Check for settings entries missing
        for (let key in settings)
            if (!Engine.ConfigDB_GetValue("user", key))
            {
                state.needsRestart = true;
                configSaveToMemoryAndToDisk(key, settings[key]);
                state.reasons.add("New customrating settings added.");
            }
    }
    
    // Check if show readme (first time user case)
    {
        const key = "customrating.readme_seen"
        if (Engine.ConfigDB_GetValue("user", key) == "false")
        {
            state.showReadme = true
            configSaveToMemoryAndToDisk(key, "true")
        }
    }

    return state;
};

autociv_patchApplyN("init", function (target, that, args)
{    
    let state = customratingvanilla_initCheck();        
    if (state.reasons.size != 0)
    {
        let message = ["Custom Rating mod made some changes.\n Go to Settings/Options and Custom Rating tab for initial setup"].
            concat(Array.from(state.reasons).map(v => ` · ${v}`)).
            join("\n");
    
        messageBox(500, 300, message,
            "CustomRating mod notice",
            ["Ok"],
            [() => { }, () => { }]
        );
    }    

    //return result;
    
    return target.apply(that, args);
})

var g_autociv_hotkeys = {
    "autociv.open.autociv_readme": function (ev)
    {
        autocivCL.Engine.PushGuiPage("page_customrating_readme.xml");
    }

};

function handleInputBeforeGui(ev)
{
    if ("hotkey" in ev && ev.hotkey in g_autociv_hotkeys && ev.type == "hotkeydown")
        return !!g_autociv_hotkeys[ev.hotkey](ev);

    return false;
}
