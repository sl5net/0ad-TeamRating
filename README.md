# 0ad-TeamRating
i dreaming for a second rating for a player called TeamRating

this a are very very first little modifications of the mod
https://wildfiregames.com/forum/topic/28390-custom-rating/

many thanks to all the 0ad developers out there

cheers

# 

get a backup rating if rating server is not accessible. seem working in my first tests.

customrating0.25.2.zip 37 kB · 2 downloads

# temporary solution. workaround: 

it read from
>~/snap/0ad/236/.config/0ad/config/user.cfg

first line

example:

>UserRatingBackup = "950"

and update this number if server is available. 

# todo

## read metadata.json

texts from
https://wildfiregames.com/forum/topic/55450-howto-read-~snap0ad236localshare0adreplays00252021-08-05_0002metadatajson/?do=findComment&comment=452775

### question

how to read howTo read metadata.json from a mod ? (  ~/snap/0ad/236/.local/share/0ad/replays/0.0.25/2021-08-05_0002/metadata.json )

### help from bb_

That file is used in the replaymenu in the public mod. It is loaded via Engine.GetReplayMetadata called from replay_menu.js
