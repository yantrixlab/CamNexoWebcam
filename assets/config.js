// Edit this file when a download is published. Nothing else on the site needs to change.
//   url:    direct link to the installer (leave "" until it exists); with store: true, the store page
//   status: "live" shows Available (a store link)
//   status: "early" shows an Early access badge, "soon" shows Coming soon
//   note:   small line under the button
window.CAMNEXO = {
  contactEmail: "yantrixlab@gmail.com",
  version: "0.3.1",
  downloads: {
    windows: { status: "early", url: "downloads/CamNexo-Setup-0.3.1.exe", sha256: "0e3b6bcb1e0d08682aef207d9c2fc1546fa5bf9b99f86121dc6c5a95d71712c0", size: "11.2 MB", note: "Version 0.3.1 for Windows 11." },
    macos:   { status: "soon",  url: "", note: "In development." },
    linux:   { status: "early", url: "https://github.com/yantrixlab/CamNexo/releases/download/linux-v0.1.0/camnexo_0.1.0_amd64.deb", sha256: "05915e7e7d5b56b030a7505c75e849276e891761441c14a75396bee7e82780bb", size: "9.1 MB", note: "Experimental. Debian and Ubuntu 22.04 or newer, 64-bit." },
    android: { status: "live", store: true, url: "https://play.google.com/store/apps/details?id=com.camnexo.webcam", note: "Android 7 or newer. Free on Google Play." },
  },
};
