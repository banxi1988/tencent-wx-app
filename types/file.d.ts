/// <reference path="./base.d.ts"/>
// 文件
declare namespace wx {
  interface SavedFileData {
    /** 文件的保存路径 */
    savedFilePath: string;
  }
  interface SaveFileOptions extends BaseOptions {
    /** 需要保存的文件的临时路径 */
    tempFilePath: string;
    /** 返回文件的保存路径，res = {savedFilePath: '文件的保存路径'} */
    success?(res: SavedFileData): void;
  }
  /**
   * 保存文件到本地。
   * 本地文件存储的大小限制为 10M
   */
  function saveFile(options: SaveFileOptions): void;

  interface File {
    /**
     * 文件的本地路径
     */
    filePath: string;
    /**
     * 文件的保存时的时间戳，从1970/01/01 08:00:00 到当前时间的秒数
     */
    createTime: number;
    /**
     * 文件大小，单位B
     */
    size: number;
  }
  interface GetSavedFileListData {
    /**
     * 接口调用结果
     */
    errMsg: string;
    /**
     * 文件列表
     */
    fileList: File[];
  }

  interface GetSavedFileListOptions extends BaseOptions {
    /** 接口调用成功的回调函数 */
    success?(res: GetSavedFileListData): void;
  }
  /**
   * 获取本地已保存的文件列表
   */
  function getSavedFileList(options: GetSavedFileListOptions): void;

  interface SavedFileInfoData {
    /**
     * 接口调用结果
     */
    errMsg: string;
    /**
     * 文件大小，单位B
     */
    size: number;
    /**
     * 文件的保存是的时间戳，从1970/01/01 08:00:00 到当前时间的秒数
     */
    createTime: number;
  }
  interface GetSavedFileInfoOptions extends BaseOptions {
    filePath: string;
    /** 接口调用成功的回调函数 */
    success?(res: SavedFileInfoData): void;
  }
  /**
   * 获取本地文件的文件信息
   */
  function getSavedFileInfo(options: GetSavedFileInfoOptions): void;

  interface RemoveSavedFileOptions extends BaseOptions {
    filePath: string; // 需要删除的文件路径
  }
  /**
   * 删除本地存储的文件
   */
  function removeSavedFile(options: RemoveSavedFileOptions): void;

  /**
   * 文件类型，指定文件类型打开文件，有效值 doc, xls, ppt, pdf, docx, xlsx, pptx
   */
  type FileType = "doc" | "xls" | "ppt" | "pdf" | "docx" | "xlsx" | "pptx";
  interface OpenDocumentOptions extends BaseOptions {
    /**
     * 文件路径，可通过 downFile 获得
     */
    filePath: string;
    /**
     * 文件类型，指定文件类型打开文件，有效值 doc, xls, ppt, pdf, docx, xlsx, pptx
     */
    fileType?: FileType;
  }
  /**
   * 新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx
   */
  function openDocument(options: OpenDocumentOptions): void;

  interface GetFileInfoResponse extends BaseResponse {
    /**
     * 文件大小，单位：B
     */
    size: number;
    /**
     *
     * 按照传入的 digestAlgorithm 计算得出的的文件摘要
     */
    digest: string;
  }

  interface GetFileInfoOptions extends BaseOptions {
    /* 
     *  本地文件路径 
    */
    filePath: string;
    /* 
     *  计算文件摘要的算法，默认值 md5，有效值：md5，sha1 
    */
    digestAlgorithm?: "md5" | "sha1";
    /* 
     * 接口调用成功的回调函数 
    */
    success?(res: GetFileInfoResponse): void;
  }

  function getFileInfo(options: GetFileInfoOptions): void;
}
