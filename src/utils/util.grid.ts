/**
 * 행추가
 * @param grid 
 * @param n 
 */
const add = (grid : any, n: number) => {
	grid.appendRow({}, {at: n});
}

const valid = (o:any, required: []) => {
	for(let c in o) {
		for(let r of required) {
			if(c == r && !o[c] && o[c] != 0) {
				alert(c + ' 필수값이 없습니다.');
				return false;
			}
		}
	}
	return true;
}

/**
 * 저장
 * @param o 
 * @param required 
 * @returns 
 */
const save = (grid : any, required: any) => {
	grid.blur();
	let saveList = [];
	let count = [0, 0, 0];
	for(let o of grid.getModifiedRows().createdRows as any) {
		o.crud = 'C';
		if(!valid(o, required)) {
			return false;
		}
		saveList.push(o);
		count[0]++;
	}
	for(let o of grid.getModifiedRows().updatedRows as any) {
		o.crud = 'U';
		if(!valid(o, required)) {
			return false;
		}
		saveList.push(o);
		count[1]++;
	}
	for(let o of grid.getModifiedRows().deletedRows as any) {
		o.crud = 'D';
		saveList.push(o);
		count[2]++;
	}
	if(count[0] == 0 && count[1] == 0 && count[2] == 0) {
		alert('변경사항이 없습니다.');
		return false;
	}
	if(confirm('등록 ' + count[0] + '건, 수정 ' + count[1] + '건, 삭제 ' + count[2] + '건을 정말 저장하시겠습니까?')) {
    return saveList;
  };
}

/**
 * 삭제
 */
const del = (grid: any) => {
	let selectRow = grid.getFocusedCell();
	if(selectRow.rowKey == null || selectRow.rowKey == undefined) {
		alert('행을 먼저 선택해주세요.');
		return;
	}
	if (confirm('선택한 행을 정말 삭제하시겠습니까?')) {
		grid.removeRow(selectRow.rowKey);
	}
}

/**
 * 새로고침
 */
const reload = () => {
  location.reload();
}

export default {
  add,
  save,
  reload,
  del,
};
