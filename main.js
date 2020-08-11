'use strict'
{
    //タスクを保存する箱
    let toDoArr = [];

    //tableBodyのIDを選択
    let tBody = document.getElementById('tableBody');

    //課題３．ボタンのクリックで状態が変化する
    function addStateBtn(tr) {
        let stateBtn = document.createElement('button');
        stateBtn.textContent = '作業中';
        stateBtn.classList.add('working');
        tr.appendChild(stateBtn);

        stateBtn.addEventListener('click', e => {
            if (e.target.classList.contains('working')) {
                e.target.textContent = '完了';
                e.target.classList.remove('working')
                e.target.classList.add('complete');
            }
            else if (e.target.classList.contains('complete')) {
                e.target.textContent = '作業中';
                e.target.classList.remove('complete')
                e.target.classList.add('working');
            }
        });
    }

    //課題２．削除ボタンをクリックするとtoDoリストの削除とIDの振りなおし
    function addDelBtn(tr) {

        let delBtn = document.createElement('button');
        delBtn.classList.add('delete');
        delBtn.textContent = '削除';
        tr.appendChild(delBtn);

        delBtn.addEventListener('click', e => {

            //テキストボックスに入力した内容をtoDoObjオブジェクトに保存する
            //toDoArr配列のindex番号をID番号とする
            let elements = document.getElementsByTagName('tr');

            //elementsのような配列風？オブジェクト（配列っぽいもの）を本当の配列にする（HTMLCollectionとは異なり静的なもの）
            elements = [].slice.call(elements);

            //id='a'をtdの親ノードのtrに追加
            e.target.parentNode.setAttribute("id", 'a')

            //Id='a'の要素
            let element = document.getElementById('a');

            //４．Id='a'の入った要素が配列の何番目かを取得
            let index = elements.indexOf(element) - 1;

            //// toDoArr からタスクを削除する
            //５．toDoArr配列からId='a'の情報を削除
            toDoArr.splice(index, 1);

            //６．対象のtoDo削除
            tBody.removeChild(element);

            ///////////////

            ////toDoArr の内容を HTML(tbody) に変換して表示する
            //７．toDoArr配列に格納したオブジェクトにIDを新たに振りなおして
            //ループでtoDoリストのidのみを新しく振りなおす（toDoリストは削除しない）
            for (let i = 0; i < toDoArr.length; i++) {

                let obj = toDoArr[i];
                obj.id = i;

                tBody.children[i].firstElementChild.textContent = obj.id;
            }
        });
    }

    //課題１．toDoリストの追加
    function addToDo() {
        document.getElementById('addBtn').addEventListener('click', () => {

            //テキストボックスに入力した内容をtoDoObjオブジェクトに保存する
            //toDoArr配列のindex番号をID番号とする
            let toDoObj = {
                id: toDoArr.length,
                comment: document.getElementById('addText').value,
            };

            //toDoObjオブジェクトの内容をtoDoArr配列の最後尾に格納する
            toDoArr.push(toDoObj);

            //trノードを生成
            let tr = document.createElement('tr');
            //trノードをhtmlへ加える
            tBody.appendChild(tr);

            //toDoArrLastが無くなるまで出力する
            for (let obj in toDoObj) {
                let td = document.createElement('td');
                td.textContent = toDoObj[obj];
                tr.appendChild(td);
            }

            //課題３．状態表示ボタンの追加
            addStateBtn(tr);
            //課題２．削除ボタンの追加
            addDelBtn(tr);

            //テキストボックスに何も入っていない状態にする
            document.getElementById('addText').value = '';
        });
    }

    //課題１．toDoリストを増やす
    //課題２. 削除ボタンを付与
    //課題３．状態ボタンで作業状態が変化する
    addToDo();
} 