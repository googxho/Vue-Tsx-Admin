import { reactive, toRefs, onMounted, defineComponent } from 'vue';

// 定义接口来定义对象的类型
interface TableDataRow {
	deptName: string;
	createTime: string;
	status: boolean;
	sort: number;
	describe: string;
	id: number;
	children?: TableDataRow[];
}
interface RuleFormState {
	deptLevel: Array<string>;
	deptName: string;
	person: string;
	phone: string | number;
	email: string;
	sort: number;
	status: boolean;
	describe: string;
}
interface DeptSate {
	isShowDialog: boolean;
	ruleForm: RuleFormState;
	deptData: Array<TableDataRow>;
}

export default defineComponent({
	name: 'systemEditDept',
	setup(props, { expose }) {
		const state = reactive<DeptSate>({
			isShowDialog: false,
			ruleForm: {
				deptLevel: [], // 上级部门
				deptName: '', // 部门名称
				person: '', // 负责人
				phone: '', // 手机号
				email: '', // 邮箱
				sort: 0, // 排序
				status: true, // 部门状态
				describe: '', // 部门描述
			},
			deptData: [], // 部门数据
		});
		// 打开弹窗
		const openDialog = (row: RuleFormState) => {
			row.deptLevel = ['vueNextAdmin'];
			row.person = 'lyt';
			row.phone = '12345678910';
			row.email = 'vueNextAdmin@123.com';
			state.ruleForm = row;
			state.isShowDialog = true;
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		// 取消
		const onCancel = () => {
			closeDialog();
		};
		// 新增
		const onSubmit = () => {
			closeDialog();
		};
		expose({ openDialog });
		// 初始化部门数据
		const initTableData = () => {
			state.deptData.push({
				deptName: 'vueNextAdmin',
				createTime: new Date().toLocaleString(),
				status: true,
				sort: Math.random(),
				describe: '顶级部门',
				id: Math.random(),
				children: [
					{
						deptName: 'IT外包服务',
						createTime: new Date().toLocaleString(),
						status: true,
						sort: Math.random(),
						describe: '总部',
						id: Math.random(),
					},
					{
						deptName: '资本控股',
						createTime: new Date().toLocaleString(),
						status: true,
						sort: Math.random(),
						describe: '分部',
						id: Math.random(),
					},
				],
			});
		};
		// 页面加载时
		onMounted(() => {
			initTableData();
		});
		return () => (
			<div class="system-edit-dept-container">
				<el-dialog
					title="修改部门"
					v-model={state.isShowDialog}
					width="769px"
					v-slots={{
						footer: () => (
							<span class="dialog-footer">
								<el-button onClick={onCancel} size="default">
									取 消
								</el-button>
								<el-button type="primary" onClick={onSubmit} size="default">
									保 存
								</el-button>
							</span>
						),
					}}
				>
					<el-form model={state.ruleForm} size="default" label-width="90px">
						<el-row gutter={35}>
							<el-col xs={24} sm={24} md={24} lg={24} xl={24} class="mb20">
								<el-form-item label="上级部门">
									<el-cascader
										options={state.deptData}
										props={{ checkStrictly: true, value: 'deptName', label: 'deptName' }}
										placeholder="请选择部门"
										clearable
										class="w100"
										v-model={state.ruleForm.deptLevel}
										v-slots={{
											default: ({ node, data }: any) => (
												<>
													<span>{data.deptName}</span>
													{!node.isLeaf ? <span> ({data.children.length}) </span> : null}
												</>
											),
										}}
									/>
								</el-form-item>
							</el-col>
							<el-col xs={24} sm={12} md={12} lg={12} xl={12} class="mb20">
								<el-form-item label="部门名称">
									<el-input v-model={state.ruleForm.deptName} placeholder="请输入部门名称" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col xs={24} sm={12} md={12} lg={12} xl={12} class="mb20">
								<el-form-item label="负责人">
									<el-input v-model={state.ruleForm.person} placeholder="请输入负责人" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col xs={24} sm={12} md={12} lg={12} xl={12} class="mb20">
								<el-form-item label="手机号">
									<el-input v-model={state.ruleForm.phone} placeholder="请输入手机号" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col xs={24} sm={12} md={12} lg={12} xl={12} class="mb20">
								<el-form-item label="邮箱">
									<el-input v-model={state.ruleForm.email} placeholder="请输入" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col xs={24} sm={12} md={12} lg={12} xl={12} class="mb20">
								<el-form-item label="排序">
									<el-input-number v-model={state.ruleForm.sort} min={0} max={999} controls-position="right" placeholder="请输入排序" class="w100" />
								</el-form-item>
							</el-col>
							<el-col xs={24} sm={12} md={12} lg={12} xl={12} class="mb20">
								<el-form-item label="部门状态">
									<el-switch v-model={state.ruleForm.status} inline-prompt active-text="启" inactive-text="禁"></el-switch>
								</el-form-item>
							</el-col>
							<el-col xs={24} sm={24} md={24} lg={24} xl={24} class="mb20">
								<el-form-item label="部门描述">
									<el-input v-model={state.ruleForm.describe} type="textarea" placeholder="请输入部门描述" maxlength="150"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-dialog>
			</div>
		);
	},
});
