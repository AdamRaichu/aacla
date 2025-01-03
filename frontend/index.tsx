import { Millennium } from "@steambrew/client";

const formSelector = ".ModalPosition .DialogContent form";

// TODO: Remove when official typings come out.
declare const LocalizationManager: any;

export default async function PluginMain() {
  Millennium.AddWindowCreateHook(async (context: any) => {
    // // Stop trying to be smart it's not working.
    // if (context.m_strTitle !== LocalizationManager.LocalizeString("#WindowName_SteamDesktop")) {
    //   console.debug("This is not the window you are looking for.");
    //   return;
    // }

    const doc = context.m_popup.document;

    while (true) {
      // Wait for the popup to exist.
      await Millennium.findElement(doc, formSelector);

      const header = (await Millennium.findElement(doc, `${formSelector} .DialogHeader`))[0] as HTMLDivElement;
      if (header.innerText.includes(LocalizationManager.LocalizeString("#LaunchApp_ShowGameArgs_Title"))) {
        const confirmButton = (await Millennium.findElement(doc, `${formSelector} button[type='submit']`))[0] as HTMLButtonElement;
        if (confirmButton.innerText.includes(LocalizationManager.LocalizeString("#Button_Continue"))) {
          console.log("%cSkipping confirmation popup.", "color: orange; font-weight: bold;");
          confirmButton.click();
        } else {
          console.warn("Button text was not 'Continue '.");
          console.warn(`"${confirmButton?.innerText}"`);
        }
      } else {
        console.warn("Popup was not for launching game with custom args.");
        console.warn(`"${header.innerText}"`);
      }
    }
  });
}
