<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\MonsterCard;
use App\Models\MagicCard;
use App\Models\TrapCard;
class CardsController extends Controller
{
    //更新されたデーターを取得する
    public function index()
    {
        $monsterData = MonsterCard::all();
        $magicData=MagicCard::all();
        $trapdata=TrapCard::all();
       


        //dd($monsterData,$magicData);
        return Inertia::render('home/cardList', [
            'monster' => $monsterData,
            'magic'=>$magicData,
            'trap'=>$trapdata
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
            'monster_attribute_id' => 'required|numeric|min:1',
            'level' => 'required|numeric|min:1',
            'monster_type_id' => 'required|numeric|min:1',
            'img_path' => 'required|image',
            'effectText'=>'max:50',
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
            'effectText.max'=>'50文字以内にしてください。',
        ]);
        $data=$request->all();

        $path=$request->file('img_path')->store('images', 'public');
        $data['img_path'] = $path;

        MonsterCard::create($data);
        
        return redirect('/home');
        

    }

    public function magicStore(Request $request)
    {
        //dd($request);
        
        $request->validate([
            'name'=>'required',
            'magic_type_id'=>'required|numeric|min:1',
            'img_path'=>'required|image',
            'effectText'=>'max:50',

        ],[
            'name.required'=>'名前は必要です',
            'magic_type_id.required'=>'マジックカードのタイプを選択してください',
            'magic_type_id.min'=>'マジックカードのタイプを選択してください',
            'img_path.required' => '画像は必須です。',
            'img_path.image' => '画像形式でなければなりません。',
            'effectText.max'=>'50文字以内にしてください。',
        ]);
        //dd($request);
        $data=$request->all();
        $path=$request->file('img_path')->store('images', 'public');
        $data['img_path'] = $path;
        MagicCard::create($data);
        

        return redirect('/home');
    
    
    }
    public function trapStore(Request $request)
    
    {

        //dd($request);
        $request->validate([
            'name'=> 'required',
            'trap_type_id'=>'required|numeric|min:1',
            'img_path'=>'required|image',
            'effectText'=>'max:50',

        ],[
            'name.required'=>'名前は必要です',
            'trap_type_id.required'=>'トラップカードのタイプを選択してください',
            'trap_type_id.min'=>'トラップカードのタイプを選択してください',
            'img_path.required' => '画像は必須です。',
            'img_path.image' => '画像形式でなければなりません。',
            'effectText.max'=>'50文字以内にしてください。',
        ]);
        $data=$request->all();
        $path=$request->file('img_path')->store('images', 'public');
        $data['img_path'] = $path;
        TrapCard::create($data);
        

        return redirect('/home');
    
    }


    //詳細画面に
    public function detail($id,$type)
    {
        if($type== '1'){
            $data=MonsterCard::find($id);
        } elseif ($type=='2'){
            $data=MagicCard::find($id);
            # code...
        }elseif($type=='3'){
            $data=TrapCard::find($id);
        }else {
            return redirect('/home');
            
        }
        return Inertia::render('home/detail',[
            'props'=>$data,
        ]);
    
    }



    //編集画面に
    public function edit($id,$type)
    {
        if($type== '1'){
                $data=MonsterCard::find($id);
        } elseif ($type=='2'){
            $data=MagicCard::find($id);
                # code...
        }elseif($type=='3'){
            $data=TrapCard::find($id);
        }else {
            return redirect('/home');
                
        }

        return Inertia::render('home/edit',[
                'props'=>$data,
            ]);
        
        

    }


    
}
