create type "public"."characterKey" as enum ('Albedo', 'Alhaitham', 'Aloy', 'Amber', 'AratakiItto', 'Arlecchino', 'Baizhu', 'Barbara', 'Beidou', 'Bennett', 'Candace', 'Charlotte', 'Chevreuse', 'Chiori', 'Chongyun', 'Clorinde', 'Collei', 'Cyno', 'Dehya', 'Diluc', 'Diona', 'Dori', 'Eula', 'Faruzan', 'Fischl', 'Freminet', 'Furina', 'Gaming', 'Ganyu', 'Gorou', 'HuTao', 'Jean', 'KaedeharaKazuha', 'Kaeya', 'KamisatoAyaka', 'KamisatoAyato', 'Kaveh', 'Keqing', 'Kirara', 'Klee', 'KujouSara', 'KukiShinobu', 'Layla', 'Lisa', 'Lynette', 'Lyney', 'Mika', 'Mona', 'Nahida', 'Navia', 'Neuvillette', 'Nilou', 'Ningguang', 'Noelle', 'Qiqi', 'RaidenShogun', 'Razor', 'Rosaria', 'SangonomiyaKokomi', 'Sayu', 'Sethos', 'Shenhe', 'ShikanoinHeizou', 'Somnia', 'Sucrose', 'Tartaglia', 'Thoma', 'Tighnari', 'Venti', 'Wanderer', 'Wriothesley', 'Xiangling', 'Xianyun', 'Xiao', 'Xingqiu', 'Xinyan', 'YaeMiko', 'Yanfei', 'Yaoyao', 'Yelan', 'Yoimiya', 'YunJin', 'Zhongli', 'TravelerAnemo', 'TravelerGeo', 'TravelerElectro', 'TravelerDendro', 'TravelerHydro');

create type "public"."weaponKey" as enum ('Absolution', 'AmenomaKageuchi', 'AquilaFavonia', 'BlackcliffLongsword', 'CinnabarSpindle', 'CoolSteel', 'DarkIronSword', 'DullBlade', 'FavoniusSword', 'FesteringDesire', 'FilletBlade', 'FinaleOfTheDeep', 'FleuveCendreFerryman', 'FreedomSworn', 'HaranGeppakuFutsu', 'HarbingerOfDawn', 'IronSting', 'KagotsurubeIsshin', 'KeyOfKhajNisut', 'LightOfFoliarIncision', 'LionsRoar', 'MistsplitterReforged', 'PrimordialJadeCutter', 'PrototypeRancour', 'RoyalLongsword', 'SacrificialSword', 'SapwoodBlade', 'SilverSword', 'SkyriderSword', 'SkywardBlade', 'SplendorOfTranquilWaters', 'SummitShaper', 'SwordOfDescension', 'SwordOfNarzissenkreuz', 'TheAlleyFlash', 'TheBlackSword', 'TheDockhandsAssistant', 'TheFlute', 'ToukabouShigure', 'TravelersHandySword', 'UrakuMisugiri', 'WolfFang', 'XiphosMoonlight', 'Akuoumaru', 'BeaconOfTheReedSea', 'BlackcliffSlasher', 'BloodtaintedGreatsword', 'DebateClub', 'FavoniusGreatsword', 'FerrousShadow', 'ForestRegalia', 'KatsuragikiriNagamasa', 'LithicBlade', 'LuxuriousSeaLord', 'MailedFlower', 'MakhairaAquamarine', 'OldMercsPal', 'PortablePowerSaw', 'PrototypeArchaic', 'Rainslasher', 'RedhornStonethresher', 'RoyalGreatsword', 'SacrificialGreatsword', 'SerpentSpine', 'SkyriderGreatsword', 'SkywardPride', 'SnowTombedStarsilver', 'SongOfBrokenPines', 'TalkingStick', 'TheBell', 'TheUnforged', 'TidalShadow', 'UltimateOverlordsMegaMagicSword', 'Verdict', 'WasterGreatsword', 'Whiteblind', 'WhiteIronGreatsword', 'WolfsGravestone', 'BalladOfTheFjords', 'BeginnersProtector', 'BlackcliffPole', 'BlackTassel', 'CalamityQueller', 'CrescentPike', 'CrimsonMoonsSemblance', 'Deathmatch', 'DialoguesOfTheDesertSages', 'DragonsBane', 'DragonspineSpear', 'EngulfingLightning', 'FavoniusLance', 'Halberd', 'IronPoint', 'KitainCrossSpear', 'LithicSpear', 'MissiveWindspear', 'Moonpiercer', 'PrimordialJadeWingedSpear', 'ProspectorsDrill', 'PrototypeStarglitter', 'RightfulReward', 'RoyalSpear', 'SkywardSpine', 'StaffOfHoma', 'StaffOfTheScarletSands', 'TheCatch', 'VortexVanquisher', 'WavebreakersFin', 'WhiteTassel', 'AlleyHunter', 'AmosBow', 'AquaSimulacra', 'BlackcliffWarbow', 'Cloudforged', 'CompoundBow', 'ElegyForTheEnd', 'EndOfTheLine', 'FadingTwilight', 'FavoniusWarbow', 'Hamayumi', 'HuntersBow', 'HuntersPath', 'IbisPiercer', 'KingsSquire', 'Messenger', 'MitternachtsWaltz', 'MouunsMoon', 'PolarStar', 'Predator', 'PrototypeCrescent', 'RangeGauge', 'RavenBow', 'RecurveBow', 'RoyalBow', 'Rust', 'SacrificialBow', 'ScionOfTheBlazingSun', 'SeasonedHuntersBow', 'SharpshootersOath', 'SkywardHarp', 'Slingshot', 'SongOfStillness', 'TheFirstGreatMagic', 'TheStringless', 'TheViridescentHunt', 'ThunderingPulse', 'WindblumeOde', 'ApprenticesNotes', 'AThousandFloatingDreams', 'BalladOfTheBoundlessBlue', 'BlackcliffAgate', 'CashflowSupervision', 'CranesEchoingCall', 'DodocoTales', 'EmeraldOrb', 'EverlastingMoonglow', 'EyeOfPerception', 'FavoniusCodex', 'FlowingPurity', 'Frostbearer', 'FruitOfFulfillment', 'HakushinRing', 'JadefallsSplendor', 'KagurasVerity', 'LostPrayerToTheSacredWinds', 'MagicGuide', 'MappaMare', 'MemoryOfDust', 'OathswornEye', 'OtherworldlyStory', 'PocketGrimoire', 'PrototypeAmber', 'QuantumCatalyst', 'RoyalGrimoire', 'SacrificialFragments', 'SacrificialJade', 'SkywardAtlas', 'SolarPearl', 'TheWidsith', 'ThrillingTalesOfDragonSlayers', 'TomeOfTheEternalFlow', 'TulaytullahsRemembrance', 'TwinNephrite', 'WanderingEvenstar', 'WineAndSong');

create table "public"."characters" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "key" "characterKey" not null,
    "level" smallint not null,
    "ascension" smallint not null,
    "talent_auto" smallint not null,
    "talent_skill" smallint not null,
    "talent_burst" smallint not null,
    "constellation" smallint not null,
    "account" uuid not null
);


alter table "public"."characters" enable row level security;

create table "public"."weapons" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "account" uuid not null,
    "key" "weaponKey" not null,
    "level" smallint not null,
    "ascension" smallint not null,
    "refinement" smallint not null,
    "lock" boolean not null default false,
    "location" "characterKey"
);


alter table "public"."weapons" enable row level security;

alter table "public"."artifacts" alter column "location" set data type "characterKey" using "location"::"characterKey";

CREATE UNIQUE INDEX characters_pkey ON public.characters USING btree (id);

CREATE UNIQUE INDEX weapons_id_key ON public.weapons USING btree (id);

CREATE UNIQUE INDEX weapons_pkey ON public.weapons USING btree (id);

alter table "public"."characters" add constraint "characters_pkey" PRIMARY KEY using index "characters_pkey";

alter table "public"."weapons" add constraint "weapons_pkey" PRIMARY KEY using index "weapons_pkey";

alter table "public"."characters" add constraint "characters_ascension_check" CHECK (((ascension >= 0) AND (ascension <= 6))) not valid;

alter table "public"."characters" validate constraint "characters_ascension_check";

alter table "public"."characters" add constraint "characters_constellation_check" CHECK (((constellation >= 0) AND (constellation <= 6))) not valid;

alter table "public"."characters" validate constraint "characters_constellation_check";

alter table "public"."characters" add constraint "characters_level_check" CHECK (((level >= 1) AND (level <= 90))) not valid;

alter table "public"."characters" validate constraint "characters_level_check";

alter table "public"."characters" add constraint "public_characters_account_fkey" FOREIGN KEY (account) REFERENCES accounts(id) ON DELETE CASCADE not valid;

alter table "public"."characters" validate constraint "public_characters_account_fkey";

alter table "public"."weapons" add constraint "public_weapons_account_fkey" FOREIGN KEY (account) REFERENCES accounts(id) ON DELETE CASCADE not valid;

alter table "public"."weapons" validate constraint "public_weapons_account_fkey";

alter table "public"."weapons" add constraint "weapons_ascension_check" CHECK (((ascension >= 0) AND (ascension <= 6))) not valid;

alter table "public"."weapons" validate constraint "weapons_ascension_check";

alter table "public"."weapons" add constraint "weapons_id_key" UNIQUE using index "weapons_id_key";

alter table "public"."weapons" add constraint "weapons_level_check" CHECK (((level >= 1) AND (level <= 90))) not valid;

alter table "public"."weapons" validate constraint "weapons_level_check";

alter table "public"."weapons" add constraint "weapons_refinement_check" CHECK (((refinement >= 0) AND (refinement <= 6))) not valid;

alter table "public"."weapons" validate constraint "weapons_refinement_check";

grant delete on table "public"."characters" to "anon";

grant insert on table "public"."characters" to "anon";

grant references on table "public"."characters" to "anon";

grant select on table "public"."characters" to "anon";

grant trigger on table "public"."characters" to "anon";

grant truncate on table "public"."characters" to "anon";

grant update on table "public"."characters" to "anon";

grant delete on table "public"."characters" to "authenticated";

grant insert on table "public"."characters" to "authenticated";

grant references on table "public"."characters" to "authenticated";

grant select on table "public"."characters" to "authenticated";

grant trigger on table "public"."characters" to "authenticated";

grant truncate on table "public"."characters" to "authenticated";

grant update on table "public"."characters" to "authenticated";

grant delete on table "public"."characters" to "service_role";

grant insert on table "public"."characters" to "service_role";

grant references on table "public"."characters" to "service_role";

grant select on table "public"."characters" to "service_role";

grant trigger on table "public"."characters" to "service_role";

grant truncate on table "public"."characters" to "service_role";

grant update on table "public"."characters" to "service_role";

grant delete on table "public"."weapons" to "anon";

grant insert on table "public"."weapons" to "anon";

grant references on table "public"."weapons" to "anon";

grant select on table "public"."weapons" to "anon";

grant trigger on table "public"."weapons" to "anon";

grant truncate on table "public"."weapons" to "anon";

grant update on table "public"."weapons" to "anon";

grant delete on table "public"."weapons" to "authenticated";

grant insert on table "public"."weapons" to "authenticated";

grant references on table "public"."weapons" to "authenticated";

grant select on table "public"."weapons" to "authenticated";

grant trigger on table "public"."weapons" to "authenticated";

grant truncate on table "public"."weapons" to "authenticated";

grant update on table "public"."weapons" to "authenticated";

grant delete on table "public"."weapons" to "service_role";

grant insert on table "public"."weapons" to "service_role";

grant references on table "public"."weapons" to "service_role";

grant select on table "public"."weapons" to "service_role";

grant trigger on table "public"."weapons" to "service_role";

grant truncate on table "public"."weapons" to "service_role";

grant update on table "public"."weapons" to "service_role";

create policy "Users can delete their own artifacts."
on "public"."artifacts"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = ( SELECT accounts.profile
   FROM accounts
  WHERE (accounts.id = artifacts.account))));


create policy "Users can update their own artifacts."
on "public"."artifacts"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = ( SELECT accounts.profile
   FROM accounts
  WHERE (accounts.id = artifacts.account))));


create policy "Public characters are viewable by everyone."
on "public"."characters"
as permissive
for select
to public
using (true);


create policy "Users can delete their own characters."
on "public"."characters"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = ( SELECT accounts.profile
   FROM accounts
  WHERE (accounts.id = characters.account))));


create policy "Users can insert their own characters."
on "public"."characters"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = ( SELECT accounts.profile
   FROM accounts
  WHERE (accounts.id = characters.account))));


create policy "Users can update their own characters."
on "public"."characters"
as permissive
for update
to public
with check ((( SELECT auth.uid() AS uid) = ( SELECT accounts.profile
   FROM accounts
  WHERE (accounts.id = characters.account))));


create policy "Public weapons are viewable by everyone."
on "public"."weapons"
as permissive
for select
to public
using (true);


create policy "Users can delete their own weapons."
on "public"."weapons"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = ( SELECT accounts.profile
   FROM accounts
  WHERE (accounts.id = weapons.account))));


create policy "Users can insert their own weapons."
on "public"."weapons"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = ( SELECT accounts.profile
   FROM accounts
  WHERE (accounts.id = weapons.account))));


create policy "Users can update their own weapons."
on "public"."weapons"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = ( SELECT accounts.profile
   FROM accounts
  WHERE (accounts.id = weapons.account))));



