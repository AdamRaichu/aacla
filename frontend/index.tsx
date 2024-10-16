import { Millennium } from "millennium-lib";
import { containsAllOf } from "./utils";

const formSelector = ".ModalPosition .DialogContent form";
const headerKeywords = ["game", "custom"];

export default async function PluginMain() {
  // Millennium.AddWindowCreateHook(onWindowCreated);
  Millennium.AddWindowCreateHook(async (context: any) => {
    if (context.m_strTitle !== "Steam") {
      console.debug("This is not the window you are looking for.");
      return;
    }

    const doc = context.m_popup.document;

    console.log("before findElement");
    // Wait for the popup to exist.
    await Millennium.findElement(doc, formSelector);
    console.log("after findElement");

    const _header = await Millennium.findElement(doc, `${formSelector} .DialogHeader`); // form.querySelector("div.DialogHeader") as HTMLDivElement;
    const header = _header[0] as HTMLDivElement;
    console.log(header.innerText);
    if (containsAllOf(header.innerText, headerKeywords)) {
      const _confirmButton = await Millennium.findElement(doc, `${formSelector} button[type='submit']`);
      const confirmButton = _confirmButton[0] as HTMLButtonElement;
      if (confirmButton.innerText === "Continue") {
        console.log("Skipped popup.");
        confirmButton.click();
      } else {
        console.warn("Button text was not 'Continue '.");
        console.warn(`"${confirmButton?.innerText}"`);
      }
    } else {
      console.warn("Popup was not for launching game with custom args.");
      console.warn(`"${header.innerText}"`);
    }
  });
}
