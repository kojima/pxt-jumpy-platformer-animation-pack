// 自動生成されたコードです。変更しないでください。
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "レベル1":
            case "レベル1":return tiles.createTilemap(hex`0a0008000000000000000000000000000000000000000000000000000001000000000000000000000000000100000000000000000000000000000000000000000101010101010101010100000000000000000000`, img`
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . 2 . . . . 
. . . . . . . . . 2 
. . . . . . . . . . 
. . . . . . . . . . 
2 2 2 2 2 2 2 2 2 2 
. . . . . . . . . . 
`, [myTiles.transparency16,sprites.builtin.forestTiles0], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
        }
        return null;
    })

}
// 自動生成されたコードです。変更しないでください。
