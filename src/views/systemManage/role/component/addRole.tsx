import { reactive, toRefs, defineComponent } from 'vue';
import './index.scss';

// 定义接口来定义对象的类型
interface MenuDataTree {
	id: number;
	label: string;
	children?: MenuDataTree[];
}
interface RoleState {
	isShowDialog: boolean;
	ruleForm: {
		roleName: string;
		roleSign: string;
		sort: number;
		status: boolean;
		describe: string;
	};
	menuData: Array<MenuDataTree>;
	menuProps: {
		children: string;
		label: string;
	};
}

export default defineComponent({
	name: 'systemAddRole',
	setup(props, { expose }) {
		const state = reactive<RoleState>({
			isShowDialog: false,
			ruleForm: {
				roleName: '', // 角色名称
				roleSign: '', // 角色标识
				sort: 0, // 排序
				status: true, // 角色状态
				describe: '', // 角色描述
			},
			menuData: [],
			menuProps: {
				children: 'children',
				label: 'label',
			},
		});
		// 打开弹窗
		const openDialog = () => {
			state.isShowDialog = true;
			getMenuData();
		};
		// 关闭弹窗
		const closeDialog = () => (state.isShowDialog = false);
		// 取消
		const onCancel = () => closeDialog();
		// 新增
		const onSubmit = () => closeDialog();
		// 获取菜单结构数据
		const getMenuData = () => {
			state.menuData = [
				{
					id: 1,
					label: '系统管理',
					children: [
						{
							id: 11,
							label: '菜单管理',
							children: [
								{
									id: 111,
									label: '菜单新增',
								},
								{
									id: 112,
									label: '菜单修改',
								},
								{
									id: 113,
									label: '菜单删除',
								},
								{
									id: 114,
									label: '菜单查询',
								},
							],
						},
						{
							id: 12,
							label: '角色管理',
							children: [
								{
									id: 121,
									label: '角色新增',
								},
								{
									id: 122,
									label: '角色修改',
								},
								{
									id: 123,
									label: '角色删除',
								},
								{
									id: 124,
									label: '角色查询',
								},
							],
						},
						{
							id: 13,
							label: '用户管理',
							children: [
								{
									id: 131,
									label: '用户新增',
								},
								{
									id: 132,
									label: '用户修改',
								},
								{
									id: 133,
									label: '用户删除',
								},
								{
									id: 134,
									label: '用户查询',
								},
							],
						},
					],
				},
				{
					id: 2,
					label: '权限管理',
					children: [
						{
							id: 21,
							label: '前端控制',
							children: [
								{
									id: 211,
									label: '页面权限',
								},
								{
									id: 212,
									label: '页面权限',
								},
							],
						},
						{
							id: 22,
							label: '后端控制',
							children: [
								{
									id: 221,
									label: '页面权限',
								},
							],
						},
					],
				},
			];
		};

		expose({ openDialog });
		return () => (
			<div class="system-add-role-container">
				<el-dialog
					title="新增角色"
					v-model={state.isShowDialog}
					width="769px"
					v-slots={{
						footer: () => (
							<span class="dialog-footer">
								<el-button onClick={onCancel} size="default">
									取 消
								</el-button>
								<el-button type="primary" onClick={onSubmit} size="default">
									新 增
								</el-button>
							</span>
						),
					}}
				>
					<el-form model={state.ruleForm} size="default" label-width="90px">
						<el-row gutter={35}>
							<el-col xs={24} sm={12} md={12} lg={12} xl={12} class="mb20">
								<el-form-item label="角色名称">
									<el-input v-model={state.ruleForm.roleName} placeholder="请输入角色名称" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col xs={24} sm={12} md={12} lg={12} xl={12} class="mb20">
								<el-form-item
									label="角色标识"
									v-slots={{
										label: () => (
											<el-tooltip effect="dark" content="用于 `router/route.ts` meta.roles" placement="top-start">
												<span>角色标识</span>
											</el-tooltip>
										),
									}}
								>
									<el-input v-model={state.ruleForm.roleSign} placeholder="请输入角色标识" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col xs={24} sm={12} md={12} lg={12} xl={12} class="mb20">
								<el-form-item label="排序">
									<el-input-number v-model={state.ruleForm.sort} min={0} max={999} controls-position="right" placeholder="请输入排序" class="w100" />
								</el-form-item>
							</el-col>
							<el-col xs={24} sm={12} md={12} lg={12} xl={12} class="mb20">
								<el-form-item label="角色状态">
									<el-switch v-model={state.ruleForm.status} inline-prompt active-text="启" inactive-text="禁"></el-switch>
								</el-form-item>
							</el-col>
							<el-col xs={24} sm={24} md={24} lg={24} xl={24} class="mb20">
								<el-form-item label="角色描述">
									<el-input v-model={state.ruleForm.describe} type="textarea" placeholder="请输入角色描述" maxlength="150"></el-input>
								</el-form-item>
							</el-col>
							<el-col xs={24} sm={24} md={24} lg={24} xl={24} class="mb20">
								<el-form-item label="菜单权限">
									<el-tree data={state.menuData} props={state.menuProps} show-checkbox class="menu-data-tree" />
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-dialog>
			</div>
		);
	},
});
