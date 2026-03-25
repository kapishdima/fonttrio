import { loadFont as loadPlayfairDisplay } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadRoboto } from "@remotion/google-fonts/Roboto";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadOpenSans } from "@remotion/google-fonts/OpenSans";
import { loadFont as loadLato } from "@remotion/google-fonts/Lato";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import { loadFont as loadDMSerifDisplay } from "@remotion/google-fonts/DMSerifDisplay";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadIBMPlexSans } from "@remotion/google-fonts/IBMPlexSans";
import { loadFont as loadIBMPlexMono } from "@remotion/google-fonts/IBMPlexMono";
import { loadFont as loadLibreBaskerville } from "@remotion/google-fonts/LibreBaskerville";
import { loadFont as loadFiraCode } from "@remotion/google-fonts/FiraCode";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";
import { loadFont as loadSourceSerif4 } from "@remotion/google-fonts/SourceSerif4";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";
import { loadFont as loadManrope } from "@remotion/google-fonts/Manrope";
import { loadFont as loadRaleway } from "@remotion/google-fonts/Raleway";
import { loadFont as loadNunito } from "@remotion/google-fonts/Nunito";
import { loadFont as loadBebasNeue } from "@remotion/google-fonts/BebasNeue";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
// Additional fonts for roulette (~50 total)
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { loadFont as loadMerriweather } from "@remotion/google-fonts/Merriweather";
import { loadFont as loadPTSans } from "@remotion/google-fonts/PTSans";
import { loadFont as loadUbuntu } from "@remotion/google-fonts/Ubuntu";
import { loadFont as loadQuicksand } from "@remotion/google-fonts/Quicksand";
import { loadFont as loadCabin } from "@remotion/google-fonts/Cabin";
import { loadFont as loadKarla } from "@remotion/google-fonts/Karla";
import { loadFont as loadRubik } from "@remotion/google-fonts/Rubik";
import { loadFont as loadWorkSans } from "@remotion/google-fonts/WorkSans";
import { loadFont as loadJosefinSans } from "@remotion/google-fonts/JosefinSans";
import { loadFont as loadMulish } from "@remotion/google-fonts/Mulish";
import { loadFont as loadBarlow } from "@remotion/google-fonts/Barlow";
import { loadFont as loadInconsolata } from "@remotion/google-fonts/Inconsolata";
import { loadFont as loadSourceCodePro } from "@remotion/google-fonts/SourceCodePro";
import { loadFont as loadCrimsonText } from "@remotion/google-fonts/CrimsonText";
import { loadFont as loadLora } from "@remotion/google-fonts/Lora";
import { loadFont as loadNotoSans } from "@remotion/google-fonts/NotoSans";
import { loadFont as loadBitter } from "@remotion/google-fonts/Bitter";
import { loadFont as loadDosis } from "@remotion/google-fonts/Dosis";
import { loadFont as loadExo2 } from "@remotion/google-fonts/Exo2";
import { loadFont as loadArchivo } from "@remotion/google-fonts/Archivo";
import { loadFont as loadOverpass } from "@remotion/google-fonts/Overpass";
import { loadFont as loadLexend } from "@remotion/google-fonts/Lexend";
import { loadFont as loadSora } from "@remotion/google-fonts/Sora";
import { loadFont as loadAlbertSans } from "@remotion/google-fonts/AlbertSans";
import { loadFont as loadAleo } from "@remotion/google-fonts/Aleo";
import { loadFont as loadAlegreyaSans } from "@remotion/google-fonts/AlegreyaSans";
import { loadFont as loadAlegreya } from "@remotion/google-fonts/Alegreya";
import { loadFont as loadAbrilFatface } from "@remotion/google-fonts/AbrilFatface";
import { loadFont as loadAlfaSlabOne } from "@remotion/google-fonts/AlfaSlabOne";

// Load all fonts at module level
const fonts = {
  playfairDisplay: loadPlayfairDisplay(),
  inter: loadInter(),
  roboto: loadRoboto(),
  montserrat: loadMontserrat(),
  openSans: loadOpenSans(),
  lato: loadLato(),
  poppins: loadPoppins(),
  dmSerifDisplay: loadDMSerifDisplay(),
  spaceGrotesk: loadSpaceGrotesk(),
  ibmPlexSans: loadIBMPlexSans(),
  ibmPlexMono: loadIBMPlexMono(),
  libreBaskerville: loadLibreBaskerville(),
  firaCode: loadFiraCode(),
  dmSans: loadDMSans(),
  sourceSerif4: loadSourceSerif4(),
  outfit: loadOutfit(),
  manrope: loadManrope(),
  raleway: loadRaleway(),
  nunito: loadNunito(),
  bebasNeue: loadBebasNeue(),
  jetBrainsMono: loadJetBrainsMono(),
  oswald: loadOswald(),
  merriweather: loadMerriweather(),
  ptSans: loadPTSans(),
  ubuntu: loadUbuntu(),
  quicksand: loadQuicksand(),
  cabin: loadCabin(),
  karla: loadKarla(),
  rubik: loadRubik(),
  workSans: loadWorkSans(),
  josefinSans: loadJosefinSans(),
  mulish: loadMulish(),
  barlow: loadBarlow(),
  inconsolata: loadInconsolata(),
  sourceCodePro: loadSourceCodePro(),
  crimsonText: loadCrimsonText(),
  lora: loadLora(),
  notoSans: loadNotoSans(),
  bitter: loadBitter(),
  dosis: loadDosis(),
  exo2: loadExo2(),
  archivo: loadArchivo(),
  overpass: loadOverpass(),
  lexend: loadLexend(),
  sora: loadSora(),
  albertSans: loadAlbertSans(),
  aleo: loadAleo(),
  alegreyaSans: loadAlegreyaSans(),
  alegreya: loadAlegreya(),
  abrilFatface: loadAbrilFatface(),
  alfaSlabOne: loadAlfaSlabOne(),
};

export default fonts;
