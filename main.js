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
            //もし、状態ボタンがworkingクラスを含んでいたらそのクラスを削除、状態ボタンを完了にしてcompleteクラスを追加する
            //そして親ノード（tr）は、workingtrを削除して、completetrを追加する
            if (e.target.classList.contains('working')) {
                e.target.textContent = '完了';
                e.target.classList.add('complete');
                e.target.parentNode.classList.add('completetr');

                e.target.classList.remove('working')
                e.target.parentNode.classList.remove('workingtr');

                //ラジオボタンが「作業中」だと、渡した引数のノードを非表示にする
                if (document.querySelector("input:checked[name=job]").value === 'working') {
                    e.target.parentNode.style.display = 'none';
                }
            }
            //もし、状態ボタンがcompleteクラスを含んでいたらそのクラスを削除、状態ボタンを完了にしてworkingクラスを追加する
            //そして親ノード（tr）は、completetrを削除して、workingtrを追加する
            else if (e.target.classList.contains('complete')) {
                e.target.textContent = '作業中';
                e.target.classList.remove('complete')
                e.target.classList.add('working');

                e.target.parentNode.classList.add('workingtr');
                e.target.parentNode.classList.remove('completetr');

                //ラジオボタンが「完了」だと、渡した引数のノードを非表示にする
                if (document.querySelector("input:checked[name=job]").value === 'complete') {
                    e.target.parentNode.style.display = 'none';
                }
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

            tr.classList.add('workingtr');

            //trノードをhtmlへ加える
            tBody.appendChild(tr);

            //toDoArrObjが無くなるまで出力する
            for (let obj in toDoObj) {
                let td = document.createElement('td');
                td.textContent = toDoObj[obj];
                tr.appendChild(td);
            }

            //課題３．状態表示ボタンの追加
            addStateBtn(tr);
            //課題２．削除ボタンの追加
            addDelBtn(tr);

            //課題4もし、完了のチェックボックスを選択していたらhtmlに追加するが表示を消す
            if (document.querySelector("input:checked[name=job]").value === 'complete') {
                tr.style.display = 'none';
            }

            //テキストボックスに何も入っていない状態にする
            document.getElementById('addText').value = '';
        });
    }

    //課題４　状態と選択したラジオボタンに応じてのtoDoリストの非表示を変更する
    function changeState() {
        let stateBox = document.getElementsByName('job');
        stateBox.forEach(function (e) {
            let forEach = Array.prototype.forEach;
            let div = tBody.children;
            let completeCol = tBody.getElementsByClassName('completetr');
            let workingCol = tBody.getElementsByClassName('workingtr');

            //課題４　ラジオボタンを変更したときに動作
            e.addEventListener('change', () => {
                //ラジオボタンが「全て」の時には、toDoリストは全て表示する
                if (document.querySelector("input:checked[name=job]").value === 'all') {
                    //
                    forEach.call(div, function (elem) {
                        elem.style.display = 'table-row';
                    });
                }
                //ラジオボタンが「作業中」の時には、toDoリストは作業中のものだけ表示する
                else if (document.querySelector("input:checked[name=job]").value === 'working') {
                    forEach.call(completeCol, function (elem) {
                        elem.style.display = 'none';
                    });

                    forEach.call(workingCol, function (elem) {
                        elem.style.display = 'table-row';
                    });
                }
                //ラジオボタンが「完了」の時には、toDoリストは完了のものだけ表示する
                else if (document.querySelector("input:checked[name=job]").value === 'complete') {
                    forEach.call(workingCol, function (elem) {
                        elem.style.display = 'none';
                    });

                    forEach.call(completeCol, function (elem) {
                        elem.style.display = 'table-row';
                    });
                }
            });
        });
    }

    //課題１．toDoリストに加える機能
    //課題２. 削除ボタンを付与
    //課題３．状態ボタンで作業状態が変化する
    addToDo();
    //課題４　状態と選択したラジオボタンに応じてのtoDoリストの非表示を変更する
    changeState();
} 