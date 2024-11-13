<?php

namespace App\Http\Controllers;

use App\Models\MagicType;
use App\Models\MonsterAttribute;
use App\Models\MonsterType;
use App\Models\TrapType;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Inertia\Inertia;
use App\Models\MonsterCard;
use App\Models\MagicCard;
use App\Models\TrapCard;
use Mockery\Undefined;
use Response;
use Storage;
class CardsController extends Controller
{

    //更新されたデーターを取得する
    public function index(Request $request)
    {
        $monsterData = MonsterCard::all();
        $magicData = MagicCard::all();
        $trapData = TrapCard::all();
        $monsterTypes = MonsterType::all();
        $monsterAttribute = MonsterAttribute::all();
        $magicType = MagicType::all();
        $trapType = TrapType::all();



        



        $elemnt=count($monsterData)+count($magicData)+count($trapData);

        //dd($elemnt);

       
        //dd($page);



       
        if ($request->method() == "POST") {

            //dd($request->input("card_type_id"));

            $card_type_id=$request->input("card_type_id");
            $AllCardData=[];

            //dd($card_type_id);

            if($card_type_id=="1"){
                $monsterData = $this->monsterSearch($request);
                //データの要素数の取得
                $elemnt=count($monsterData);
                

                $magicData=[];
                $trapData = [];
                $filltar=$request->input();
                //dd($monsterData);
            }else if($card_type_id== "2"){
                $magicData = $this->magicSearch($request);

                 //データの要素数の取得
                $elemnt=count($magicData);

                $monsterData=[];
                $trapData = [];
                $filltar=$request->input();

            }else if($card_type_id=="3"){
                $trapData = $this->trapSearch($request);
                 //データの要素数の取得
                $elemnt=count($trapData);

                $monsterData=[];
                $magicData=[];
                $filltar=$request->input();

            };
            
            //$monsterData = $this->monsterSearch($request);
            //$magicData = $this->magicSearch($request);
            //$trapData = $this->trapSearch($request);
            //dd($monsterData);
        }else{

            $filltar=[];
            $AllCardData = array_merge($monsterData->toArray(), $magicData->toArray(), $trapData->toArray());

        };

        $page=floor($elemnt/10)+1;



        //$a=MonsterType::get("id");

        //dd($a);

        // foreach($monsterData as $data){
        //     $type_id=$data['monster_type_id'];

        //     //どのDBの書き換えを行うかを指定するため
        //     $id=$data['id'];

        //     //dd($type_id);

        //     $type=MonsterType::where("id",$type_id)->get('value');

        //     //dd($type);//ここに文字列のタイプを保存

        //     MonsterCard::where('id',$id)->update(["monster_type_id"=>$type]);

        //     $a=MonsterCard::get();
        //     dd($a);

        



        // }
     





        //dd($monsterData,$magicData);
        return Inertia::render('home/cardList', [
            'monster' => $monsterData,
            'magic' => $magicData,
            'trap' => $trapData,
            'monsterType' => $monsterTypes,
            'monsterAttribute' => $monsterAttribute,
            'magicType' => $magicType,
            'trapType' => $trapType,
            'filltar'=>$filltar,
            'elemnt'=>$elemnt,
            'page'=>$page,
            'AllCardData'=>$AllCardData,
            
        ]);
    }



    public function monsterCreate()
    {
        return Inertia::render('home/createCard');
    }

    //テスト段階ではモンスターのみを更新

    public function store(Request $request)
    {
        //dd($request);
        $request->validate([
            'name' => 'required',
            'attack' => 'required|numeric|min:1',
            'defense' => 'required|numeric|min:1',
            'monster_attribute_id' => 'required|numeric|min:0',
            'level' => 'required|numeric|min:1',
            'monster_type_id' => 'required|numeric|min:0',
            'img_path' => 'required|image',
            'effectText' => 'max:255',
        ], [
            'name.required' => 'モンスター名は必須です。',
            'attack.required' => '攻撃力の登録は必須です。',
            'attack.min' => '攻撃力の登録は必須です。',
            'defense.required' => '防御力の登録は必須です。',
            'defense.min' => '防御力の登録は必須です。',
            'monster_attribute_id.required' => 'モンスター属性の選択は必須です。',
            'monster_attribute_id.min' => 'モンスター属性の選択は必須です。',
            'level.required' => 'レベルの登録は必須です。',
            'level.min' => 'レベルの登録は必須です。',
            'monster_type_id.required' => 'モンスタータイプのIDは必須です。',
            'monster_type_id.min' => 'モンスターのタイプ選択は必須です。',
            'img_path.required' => '画像は必須です。',
            'img_path.image' => '画像形式でなければなりません。',
            'effectText.max' => '255文字以内にしてください。',
        ]);
        $data = $request->all();

        $path = $request->file('img_path')->store('images', 'public');
        $data['img_path'] = $path;

        MonsterCard::create($data);

        return redirect('/home');


    }

    public function magicStore(Request $request)
    {
       

        $request->validate([
            'name' => 'required',
            'magic_type_id' => 'required|numeric|min:0',
            'img_path' => 'required|image',
            'effectText' => 'max:255',

        ], [
            'name.required' => '名前は必要です',
            'magic_type_id.required' => 'マジックカードのタイプを選択してください',
            'magic_type_id.min' => 'マジックカードのタイプを選択してください',
            'img_path.required' => '画像は必須です。',
            'img_path.image' => '画像形式でなければなりません。',
            'effectText' => '255文字以内です。'
        ]);
        //dd($request);
        $data = $request->all();
        $path = $request->file('img_path')->store('images', 'public');
        $data['img_path'] = $path;
        MagicCard::create($data);


        return redirect('/home');




    }
    public function trapStore(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'trap_type_id' => 'required|numeric|min:0',
            'img_path' => 'required|image',
            'effectText' => 'max:255',

        ], [
            'name.required' => '名前は必要です',
            'trap_type_id.required' => 'トラップカードのタイプを選択してください',
            'trap_type_id.min' => 'トラップカードのタイプを選択してください',
            'img_path.required' => '画像は必須です。',
            'img_path.image' => '画像形式でなければなりません。',
            'effectText.max' => '255文字以内にしてください。',
        ]);
        $data = $request->all();
        $path = $request->file('img_path')->store('images', 'public');
        $data['img_path'] = $path;
        TrapCard::create($data);


        return redirect('/home');

    }


    //詳細画面に
    public function detail($id, $type)
    {
        if ($type == '1') {
            $data = MonsterCard::find($id);
            $Type = MonsterType::all();
            $Attribute = MonsterAttribute::all();
        } elseif ($type == '2') {
            $data = MagicCard::find($id);
            $Type = MagicType::all();
            $Attribute = null;
            # code...
        } elseif ($type == '3') {
            $data = TrapCard::find($id);
            $Type = TrapType::all();
            $Attribute = null;
        } else {
            return redirect('/home');

        }
        return Inertia::render('home/detail', [
            'props' => $data,
            'type' => $Type,
            'attribute' => $Attribute
        ]);

    }



    //編集画面に
    public function edit($id)
    {

        $data = MonsterCard::find($id);

        return Inertia::render('home/monsterEdit', [
            'props' => $data,
        ]);

    }
    public function magicEdit($id)
    {

        $data = MagicCard::find($id);

        return Inertia::render('home/magicEdit', [
            'props' => $data,
        ]);

    }
    public function trapEdit($id)
    {

        $data = TrapCard::find($id);

        return Inertia::render('home/trapEdit', [
            'props' => $data,
        ]);

    }






    public function update(Request $request, $id): Redirector|RedirectResponse
    {
        $request->validate([
            'name' => 'required',
            'attack' => 'required|numeric|min:1',
            'defense' => 'required|numeric|min:1',
            'monster_attribute_id' => 'required|numeric|min:0',
            'level' => 'required|numeric|min:1',
            'monster_type_id' => 'required|numeric|min:0',
            'img_path' => 'nullable|image',
            'effectText' => 'max:255',
        ], [
            'name.required' => 'モンスター名は必須です。',
            'attack.required' => '攻撃力の登録は必須です。',
            'attack.min' => '攻撃力の登録は必須です。',
            'defense.required' => '防御力の登録は必須です。',
            'defense.min' => '防御力の登録は必須です。',
            'monster_attribute_id.required' => 'モンスター属性の選択は必須です。',
            'monster_attribute_id.min' => 'モンスター属性の選択は必須です。',
            'level.required' => 'レベルの登録は必須です。',
            'level.min' => 'レベルの登録は必須です。',
            'monster_type_id.required' => 'モンスタータイプのIDは必須です。',
            'monster_type_id.min' => 'モンスターのタイプ選択は必須です。',

            'img_path.image' => '画像形式でなければなりません。',
            'effectText.max' => '255文字以内にしてください。',
        ]);
        $updateEntiry = MonsterCard::find($id);

        $image = $request->file('img_path');
        if (isset($image)) {
            Storage::disk('public')->delete($updateEntiry->img_path);
            $path = $request->file('img_path')->store('images', 'public');
            $updateEntiry->img_path = $path;
        }

        $updateEntiry->update([
            'name' => $request->name,
            'attack' => $request->attack,
            'defense' => $request->defense,
            'monster_attribute_id' => $request->monster_attribute_id,
            'level' => $request->level,
            'monster_type_id' => $request->monster_type_id,
            'img_path' => $updateEntiry->img_path,
            'effectText' => $request->effectText,


        ]);


        return redirect('/home');



    }

    public function magicUpdate(Request $request, $id): Redirector|RedirectResponse
    {

        //dd($request);
        $request->validate([
            'name' => 'required',
            'magic_type_id' => 'required|numeric|min:0',
            'img_path' => 'nullable|image',
            'effectText' => 'max:255',

        ], [
            'name.required' => '名前は必要です',
            'magic_type_id.required' => 'マジックカードのタイプを選択してください',
            'magic_type_id.min' => 'マジックカードのタイプを選択してください',
            'img_path.image' => '画像形式でなければなりません。',
            'effectText.required' => '必要です',
            'effectText.max' => '255文字以内にしてください。',
        ]);

        //なぜ変数の更新がデーターベースの更新にも繋がるのか
        $updateEntiry = magicCard::find($id);

        $image = $request->file('img_path');
        if (isset($image)) {
            Storage::disk('public')->delete($updateEntiry->img_path);
            $path = $request->file('img_path')->store('images', 'public');
            $updateEntiry->img_path = $path;
        }

        $updateEntiry->update([
            'name' => $request->name,
            'magic_type_id' => $request->magic_type_id,
            'img_path' => $updateEntiry->img_path,
            'effectText' => $request->effectText,


        ]);
        //dd($updateEntiry);


        return redirect('/home');


    }

    public function trapUpdate(Request $request, $id): Redirector|RedirectResponse
    {
        $request->validate([
            'name' => 'required',
            'trap_type_id' => 'required|numeric|min:0',
            'img_path' => 'nullable|image',
            'effectText' => 'max:255',

        ], [
            'name.required' => '名前は必要です',
            'trap_type_id.required' => 'トラップカードのタイプを選択してください',
            'trap_type_id.min' => 'トラップカードのタイプを選択してください',
            'img_path.image' => '画像形式でなければなりません。',
            'effectText.max' => '255文字以内にしてください。',
        ]);

        $updateEntiry = trapCard::find($id);

        $image = $request->file('img_path');
        if (isset($image)) {
            Storage::disk('public')->delete($updateEntiry->img_path);
            $path = $request->file('img_path')->store('images', 'public');
            $updateEntiry->img_path = $path;
        }

        $updateEntiry->update([
            'name' => $request->name,
            'trap_type_id' => $request->trap_type_id,
            'img_path' => $updateEntiry->img_path,
            'effectText' => $request->effectText,


        ]);



        return redirect('/home');


    }

    //入力情報を元にクエリを作成
    public function monsterSearch(Request $request)
    {

        //dd($request);

       /* $request->validate([
            'name' => 'nullable',
            'minAttack' => 'nullable',
            'maxAttack' => 'nullable',
            'minDefense' => 'nullable',
            'maxDefense' => 'nullable',
            'monster_attribute_id' => 'nullable',
            'minLevel' => 'nullable',
            'maxLevel' => 'nullable',
            'monster_type_id' => 'nullable',

        ]);*/

        $name = $request->get('name');
        $minAttack = $request->get('minAttack');
        $maxAttack = $request->get('maxAttack');
        $minDefense = $request->get('minDefense');
        $maxDefense = $request->get('maxDefense');
        $min_level = $request->get('minLevel');
        $max_level = $request->get('maxLevel');
        $monster_type_id = $request->get(key: 'monster_type_id');
        $monster_attribute_id = $request->get(key: 'monster_attribute_id');

        //dd($monster_type_id);


        


        $monsterQuery = MonsterCard::query();

        //dd($request);

        $monsterQuery->when($name, function ($monsterQuery, $name) {
            $monsterQuery->where('name', $name); });
        $monsterQuery->when($minAttack, function ($monsterQuery, $minAttack) {
            $monsterQuery->where('attack', '>', $minAttack); });
        $monsterQuery->when($maxAttack, function ($monsterQuery, $maxAttack) {
            $monsterQuery->where('attack', '<', $maxAttack); });
        $monsterQuery->when($minDefense, function ($monsterQuery, $minDefense) {
            $monsterQuery->where('Defense', '>', $minDefense); });
        $monsterQuery->when($maxDefense, function ($monsterQuery, $maxDefense) {
            $monsterQuery->where('Defense', '<', $maxDefense); });
        $monsterQuery->when($min_level, function ($monsterQuery, $min_level) {
            $monsterQuery->where('level', '>', $min_level); });
        $monsterQuery->when($max_level, function ($monsterQuery, $max_level) {
            $monsterQuery->where('level', '<', $max_level); });
        $monsterQuery->when(isset($monster_type_id), function ($monsterQuery) use ($monster_type_id) {
                $monsterQuery->where('monster_type_id', '=', $monster_type_id);
            });            
        $monsterQuery->when(isset($monster_attribute_id), function ($monsterQuery) use($monster_attribute_id){
            $monsterQuery->where('monster_attribute_id','=' ,$monster_attribute_id); });

  
        $result = $monsterQuery->get();
        //dd($result);




        // dd($result);

        return $result;


    }
    public function magicSearch(Request $request): Collection
    {
        $request->validate([
            'name' => 'nullable',
            'magic_type_id' => 'nullable',
        ]);
        $name = $request->get('name');
        $magic_type_id = $request->get(key: 'magic_type_id');

        $magicQuery = MagicCard::query();

        $magicQuery->when($name, function ($magicQuery, $name) {
            $magicQuery->where('name', $name); });
        $magicQuery->when(isset($magic_type_id), function ($magicQuery)use( $magic_type_id) {
            $magicQuery->where('magic_type_id', $magic_type_id); });




        $result = $magicQuery->get();




        return $result;
    }

    public function trapSearch(Request $request): Collection
    {
        $request->validate([
            'name' => 'nullable',
            'trap_type_id' => 'nullable',
        ]);
        $name = $request->get('name');
        $trap_type_id = $request->get(key: 'trap_type_id');

        $trapQuery = TrapCard::query();

        $trapQuery->when($name, function ($trapQuery, $name) {
            $trapQuery->where('name', $name); });
        $trapQuery->when(isset($trap_type_id), function ($trapQuery) use ($trap_type_id) {
            $trapQuery->where('trap_type_id', $trap_type_id); });




        
        $result = $trapQuery->get();


        return $result;
    }

    public function Delete(Request $request):Redirector|RedirectResponse
    {
        //dd($request);
        $request->validate([
            'Data'=>'required',
        ],
        ['Data.required'=>'カードが選択されていません。'

        ]);


        $Datas=$request->input('Data');
        //$Datas=collect($Datas);

        //dd($Datas);

        //配列の要素を一つづ取り出し、要素に該当するデータをカードリストから削除
        foreach($Datas as $data){
            
            $card_type_id=$data['card_type_id'];
            $id=$data['id'];

            switch($card_type_id)
            {
                case 1;
                
                    MonsterCard::where('id',$id)->delete();
                    break;

                case 2;

                    MagicCard::where('id',$id)->delete();
                    break;
                case 3;

                    TrapCard::where('id',$id)->delete();
                    break;
            }

            
        }

        return redirect('/home');

        
    }





}
