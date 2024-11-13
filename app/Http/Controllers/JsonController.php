<?php

namespace App\Http\Controllers;

use App\Models\MagicCard;
use App\Models\MagicType;
use App\Models\MonsterAttribute;
use App\Models\MonsterCard;
use App\Models\MonsterType;
use App\Models\TrapCard;
use App\Models\TrapType;
use Illuminate\Http\Request;
use Redirect;
use Str;

class JsonController extends Controller
{
    

    public function toJson(Request $request)
    {
        //dd($request);
        $json = [];

        if ($request->method() == "POST") {

            $cards = $request->input("Data");
            //dd($cards);
          
            $card_type_id = $cards[0]['card_type_id'];

            //dd($card_type_id);

            switch ($card_type_id) {
                case "1": {
                    foreach ($cards as $card) {

                        $Data["uuid"] = (string) Str::uuid();
                        $Data["cardType"] = "monster";
                        $Data['name'] = $card['name'];
                        $Data['attack'] = $card['attack'];
                        $Data['defense'] = $card['defense'];
                        $Data['attribute'] = $this->monster_attribute($card['monster_attribute_id']);
                        $Data['level'] = $card['level'];
                        $Data['type'] = $this->monster_type($card['monster_type_id']);
                        $Data['img'] = $this->img($card['img_path']);
                        $Data['effectText'] = $card['effectText'];

                        $json[] = $Data;
                    }
                    break;

                }
                case "2": {
                    //dd($cards);
                    foreach ($cards as $card) {
                        $Data['uuid'] = (string) Str::uuid();
                        $Data["cardType"] = "magic";
                        $Data['name'] = $card['name'];
                        $Data['type'] = $this->magic_type($card['magic_type_id']);
                        $Data['img'] = $this->img($card['img_path']);
                        $Data['effectText'] = $card['effectText'];

                        $json[] = $Data;
                    }
                    break;
                }
                case "3": {

                    foreach ($cards as $card) {
                        $Data['uuid'] = (string) Str::uuid();
                        $Data["cardType"] = "trap";
                        $Data['name'] = $card['name'];
                        $Data['type'] = $this->trap_type($card['trap_type_id']);
                        $Data['img'] = $this->img($card['trap_type_id']);
                        $Data['effectText'] = $card['effectText'];

                        $json[] = $Data;

                    }

                    break;
                }

            }
            
        }else{
            $monsterCards = MonsterCard::all();
           


            foreach ($monsterCards as $monsterCard) {
    
                $monsterData["uuid"] = (string) Str::uuid();
                $monsterData["cardType"] = "monster";
                $monsterData['name'] = $monsterCard->name;
                $monsterData['attack'] = $monsterCard->attack;
                $monsterData['defense'] = $monsterCard->defense;
                $monsterData['attribute'] = $this->monster_attribute($monsterCard->monster_attribute_id);
                $monsterData['level'] = $monsterCard->level;
                $monsterData['type'] = $this->monster_type($monsterCard->monster_type_id);
                $monsterData['img'] = $this->img($monsterCard->img_path);
                $monsterData['effectText'] = $monsterCard->effectText;
    
    
                $json[] = $monsterData;
                //dd($data);
            }
            ;
    
            $magicCards = MagicCard::all();
    
            foreach ($magicCards as $magicCard) {
                $magicData['uuid'] = (string) Str::uuid();
                $magicData["cardType"] = "magic";
                $magicData['name'] = $magicCard->name;
                $magicData['type'] = $this->magic_type($magicCard->magic_type_id);
                $magicData['img'] = $this->img($magicCard->img_path);
                $magicData['effectText'] = $magicCard->effectText;
    
                $json[] = $magicData;
    
    
    
            }
            ;
    
            $trapCards = trapCard::all();
    
            foreach ($trapCards as $trapCard) {
                $trapData['uuid'] = (string) Str::uuid();
                $trapData["cardType"] = "trap";
                $trapData['name'] = $trapCard->name;
                $trapData['type'] = $this->trap_type($trapCard->trap_type_id);
                $trapData['img'] = $this->img($trapCard->img_path);
                $trapData['effectText'] = $trapCard->effectText;
    
                $json[] = $trapData;
    
    
    
            }
            ;
    

        }
        
        //dd($json);


        return response()->json($json);

    }

    private function monster_type($type_id)
    {

        return MonsterType::where("id", $type_id + 1)->value("value");

    }
    private function monster_attribute($attribute_id): mixed
    {
        return MonsterAttribute::where("id", $attribute_id + 1)->value("value");


    }

    private function magic_type($type_id): mixed
    {
        return MagicType::where("id", $type_id + 1)->value("value");
    }

    private function trap_type($type_id): mixed
    {

        return TrapType::where("id", $type_id + 1)->value("value");


    }

    private function img($img_path): mixed
    {
        return url("storage/" . $img_path);
    }








}
