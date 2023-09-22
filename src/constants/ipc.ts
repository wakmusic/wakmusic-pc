export enum IPCMain {
  WINDOW_MAXIMIZED = "window:maximized",
  WINDOW_UNMAXIMIZED = "window:unmaximized",

  REPLY_IS_SEPARATE = "reply:isSeparate",
  REPLY_VERSION = "reply:version",

  SCHEME = "scheme",
}

export enum IPCRenderer {
  WINDOW_LEAST = "window:least",
  WINDOW_MAX = "window:max",
  WINDOW_CLOSE = "window:close",
  WINDOW_HIDE = "window:hide",

  MODE_DEFAULT = "mode:default",
  MODE_SEPARATE = "mode:separate",

  RPC_PROGRESS = "rpc:progress",
  RPC_PLAYING = "rpc:playing",
  RPC_TRACK = "rpc:track",

  USER_LOGIN = "user:login",
  USER_LOGOUT = "user:logout",

  QUERY_IS_SEPARATE = "query:isSeparate",
  QUERY_VERSION = "query:version",

  CREATE_SHORTCUT = "create:shortcut",
}
