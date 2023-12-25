/** @enum {string} */
const mimeTypes = Object.freeze({
  // AAC audio
  'aac': 'audio/aac',

  // AbiWord document
  'abw': 'application/x-abiword',

  // Archive document (multiple files embedded)
  'arc': 'application/x-freearc',

  // AVI: Audio Video Interleave
  'avi': 'video/x-msvideo',

  // Amazon Kindle eBook format
  'azw': 'application/vnd.amazon.ebook',

  // Any kind of binary data
  'bin': 'application/octet-stream',

  // Windows OS/2 Bitmap Graphics
  'bmp': 'image/bmp',

  // BZip archive
  'bz': 'application/x-bzip',

  // BZip2 archive
  'bz2': 'application/x-bzip2',

  'cab': 'application/vnd.ms-cab-compressed',

  // CD audio
  'cda': 'application/x-cdf',

  // C-Shell script
  'csh': 'application/x-csh',

  // Cascading Style Sheets (CSS)
  'css': 'text/css',

  // Comma-separated values (CSV)
  'csv': 'text/csv',

  // DLL file
  'dll': 'application/x-msdownload',

  // Microsoft Word
  'doc': 'application/msword',

  // Microsoft Word (OpenXML)
  'docm': 'application/vnd.ms-word.document.macroEnabled.12',

  // Microsoft Word (OpenXML)
  'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',

  // MS Embedded OpenType fonts
  'eot': 'application/vnd.ms-fontobject',

  // Electronic publication (EPUB)
  'epub': 'application/epub+zip',

  // MicroSoft Windows executable file
  'exe': 'application/x-msdownload',

  // Adobe Flash video
  'flv': 'video/x-flv',

  // GZip Compressed Archive
  'gz': 'application/gzip',

  // Graphics Interchange Format (GIF)
  'gif': 'image/gif',

  // HyperText Markup Language (HTML)
  'htm': 'text/html',
  'html': 'text/html',

  // Icon format
  'ico': 'image/vnd.microsoft.icon',

  // iCalendar format
  'ics': 'text/calendar',

  // Java Archive (JAR)
  'jar': 'application/java-archive',

  // JPEG images
  'jpe': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',

  // JavaScript
  'js': 'application/javascript',

  // JSON format
  'json': 'application/json',

  // JSON-LD format
  'jsonld': 'application/ld+json',

  // JSX format
  'jsx': 'text/jscript',

  // Source-map file
  'map': 'application/json',

  // Musical Instrument Digital Interface (MIDI)
  'mid': 'audio/midi',
  'midi': 'audio/midi',

  // JavaScript module
  'mjs': 'application/javascript',

  // MP3 audio
  'mp3': 'audio/mpeg',

  // MP4 video
  'mp4': 'video/mp4',

  // MPEG Video
  'mpeg': 'video/mpeg',

  // Apple Installer Package
  'mpkg': 'application/vnd.apple.installer+xml',

  // Windows Installer Package
  'msi': 'application/x-msdownload',

  // OpenDocument presentation document
  'odp': 'application/vnd.oasis.opendocument.presentation',

  // OpenDocument spreadsheet document
  'ods': 'application/vnd.oasis.opendocument.spreadsheet',

  // OpenDocument text document
  'odt': 'application/vnd.oasis.opendocument.text',

  // OGG audio
  'oga': 'audio/ogg',

  // OGG video
  'ogv': 'video/ogg',

  // OGG
  'ogx': 'application/ogg',

  // Opus audio
  'opus': 'audio/opus',

  // OpenType font
  'otf': 'font/otf',

  // Adobe Portable Document Format (PDF)
  'pdf': 'application/pdf',

  // PHP file
  'php': 'text/x-php',

  // Portable Network Graphics
  'png': 'image/png',

  // Microsoft PowerPoint
  'ppt': 'application/vnd.ms-powerpoint',

  // Microsoft PowerPoint (OpenXML)
  'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',

  // RAR archive
  'rar': 'application/x-rar-compressed',

  // Rich Text Format (RTF)
  'rtf': 'application/rtf',

  // Bourne shell script
  'sh': 'application/x-sh',

  // Scalable Vector Graphics (SVG)
  'svg': 'image/svg+xml',
  'svgz': 'image/svg+xml',

  // Small web format (SWF) or Adobe Flash document
  'swf': 'application/x-shockwave-flash',

  // Tape Archive (TAR)
  'tar': 'application/x-tar',

  // Tagged Image File Format (TIFF)
  'tif': 'image/tiff',
  'tiff': 'image/tiff',

  // MPEG transport stream
  'ts': 'video/mp2t',

  // TrueType Font
  'ttf': 'font/ttf',

  // Text, (generally ASCII or ISO 8859-n)
  'txt': 'text/plain',

  // Microsoft Visio
  'vsd': 'application/vnd.visio',

  // Waveform Audio Format
  'wav': 'audio/wav',

  // WEBM audio
  'weba': 'audio/webm',

  // WEBM video
  'webm': 'video/webm',

  // WEBP image
  'webp': 'image/webp',

  // Web Open Font Format (WOFF)
  'woff': 'font/woff',
  'woff2': 'font/woff2',

  // XHTML
  'xhtml': 'application/xhtml+xml',

  // Microsoft Excel
  'xls': 'application/vnd.ms-excel',

  // Microsoft Excel (OpenXML)
  'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

  // XML
  'xml': 'application/xml',

  // XUL
  'xul': 'application/vnd.mozilla.xul+xml',

  // ZIP archive
  'zip': 'application/zip',

  // 3GPP audio/video container
  '3gp': 'video/3gpp',

  // 3GPP2 audio/video container
  '3g2': 'video/3gpp2',

  // 7-zip archive
  '7z': 'application/x-7z-compressed'
})

export { mimeTypes }
