// 修复UMI 4.x导入方式
// // 使用模拟的request
// const request = async <T = any>(url: string, options?: any): Promise<T> => {
//   // 模拟请求实现，实际应用中需要正确的实现
//   return {
//     success: true,
//     data: {
//       list: [],
//       total: 0,
//       available: true
//     },
//     message: 'success'
//   };
// };

export type RoleModelState = ReturnType<typeof useRoleModel>;

export default useRoleModel;
