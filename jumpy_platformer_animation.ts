/**
 * Jumpy platformer animation
 */
//% weight=100 color=#0fbc11 icon=""
namespace jumpy_platformer_animation {
    const stateNamespace = "__jumpy_platformer_animation"

    enum SpriteDirection {
        RIGHT,
        LEFT
    }

    enum SpriteState {
        IDLE,
        JUMP,
        RUN
    }

    type AnimationData = {
        direction: SpriteDirection,
        state: SpriteState
    }

    /**
     * スプライトのアニメーションを設定する
     */
    //% block="アニメーションを設定する スプライト $sprite=variables_get(mySprite) アイドル右 $idleRight=animation_editor アイドル左 $idleLeft=animation_editor 間隔(ms) $idleInterval=timePicker 移動右 $runRight=animation_editor 移動左 $runLeft=animation_editor 間隔(ms) $runInterval=timePicker ジャンプ右 $jumpRight=screen_image_picker ジャンプ左 $jumpLeft=screen_image_picker"
    //% weight=100
    export function setSpriteAnimations(
        sprite: Sprite,
        idleRight: Image[], idleLeft: Image[], idleInterval: number,
        runRight: Image[], runLeft: Image[], runInterval: number,
        jumpRight: Image, jumpLeft: Image) {
        if (!sprite) return

        const dataKey = stateNamespace

        let spriteDicts = game.currentScene().data[dataKey]
        if (!spriteDicts) {
            spriteDicts = game.currentScene().data[dataKey] = {}
        }

        let data: AnimationData = spriteDicts[sprite.id]
        if (!data) {
            data = { direction: SpriteDirection.RIGHT, state: SpriteState.IDLE }
            animation.runImageAnimation(sprite, idleRight, idleInterval, true)
        }
        game.eventContext().registerFrameHandler(scene.ANIMATION_UPDATE_PRIORITY, () => {
            const direction = data.direction
            const state = data.state
            if (Math.abs(sprite.vy) > 0) {  // jumping
                if (state !== SpriteState.JUMP) {
                    animation.stopAnimation(animation.AnimationTypes.All, sprite)
                }
                if (sprite.vx > 0) {
                    data.direction = SpriteDirection.RIGHT
                } else if (sprite.vx < 0) {
                    data.direction = SpriteDirection.LEFT
                }
                if (data.direction === SpriteDirection.RIGHT) {
                    sprite.setImage(jumpRight)
                } else if (data.direction === SpriteDirection.LEFT) {
                    sprite.setImage(jumpLeft)
                }
                data.state = SpriteState.JUMP
            } else if (Math.abs(sprite.vx) > 0) {   // running
                if (sprite.vx > 0 && (direction !== SpriteDirection.RIGHT || state !== SpriteState.RUN)) {
                    animation.runImageAnimation(
                        sprite,
                        runRight,
                        runInterval,
                        true
                    )
                    data.direction = SpriteDirection.RIGHT
                } else if (sprite.vx < 0 && (direction !== SpriteDirection.LEFT || state !== SpriteState.RUN)) {
                    animation.runImageAnimation(
                        sprite,
                        runLeft,
                        runInterval,
                        true
                    )
                    data.direction = SpriteDirection.LEFT
                }
                data.state = SpriteState.RUN
            } else if (state !== SpriteState.IDLE && sprite.isHittingTile(CollisionDirection.Bottom)) {  // idle
                if (direction === SpriteDirection.RIGHT) {
                    animation.runImageAnimation(sprite, idleRight, idleInterval, true)
                } else {
                    animation.runImageAnimation(sprite, idleLeft, idleInterval, true)
                }
                data.state = SpriteState.IDLE
            }
            spriteDicts[sprite.id] = data
        })
    }
}
