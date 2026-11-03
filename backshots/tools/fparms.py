# First-person arms from Sketchfab (see CREDITS.md), converted with Blender's FBX importer (three.js reads these rigs
# badly). Run with Blender's Python (pip install bpy), then `node tools/assets.mjs fparms <dir>` adds textures and packs:
#   python tools/fparms.py -- <dir with fps-pistol-animations/ and m16-a2-assault-rifle-animated/> <same dir>
# rifle: the arms + armature + the animated M16 (body 'rifle_ref' and its parts) + two empties following it ('gun',
#        'mag'); one baked clip (30 fps)
# pistol: the arms + armature (gun bones PBody / Rif / Pmag, camera bone Head_Cam) + the pistol (frame 'pistol_ref'),
#         each action its own clip
import bpy, sys, os
src, out = sys.argv[sys.argv.index('--') + 1:][:2] if '--' in sys.argv else sys.argv[1:3]

def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)

def proxy(obj, name):
    # an empty in place of a mesh object, keeping its animation and parent
    e = bpy.data.objects.new(name, None); bpy.context.scene.collection.objects.link(e)
    e.parent = obj.parent; e.matrix_parent_inverse = obj.matrix_parent_inverse.copy()
    e.location, e.rotation_mode = obj.location.copy(), obj.rotation_mode
    e.rotation_euler, e.rotation_quaternion, e.scale = obj.rotation_euler.copy(), obj.rotation_quaternion.copy(), obj.scale.copy()
    if obj.animation_data and obj.animation_data.action:
        e.animation_data_create(); e.animation_data.action = obj.animation_data.action
        if hasattr(obj.animation_data, 'action_slot') and obj.animation_data.action_slot: e.animation_data.action_slot = obj.animation_data.action_slot
    return e

def export(path, mode):
    bpy.ops.export_scene.gltf(filepath=path, export_format='GLB', export_animation_mode=mode, export_force_sampling=True,
        export_optimize_animation_size=False, export_skins=True, export_def_bones=False, export_materials='EXPORT', export_image_format='NONE', export_yup=True)

# ---- rifle (M16 A2, user77) ----
reset()
bpy.ops.import_scene.fbx(filepath=os.path.join(src, 'm16-a2-assault-rifle-animated/source/M16 A2 Rifle - Animated.fbx'))
base, mag = bpy.data.objects['m16a2_base'], bpy.data.objects['magazine']
g = proxy(base, 'gun'); m = proxy(mag, 'mag'); m.parent = g
# the M16 itself stays whole (its parts animated): it is shown in the hands as the M4, and lines our rifles up
base.name = 'rifle_ref'
bpy.context.scene.frame_start, bpy.context.scene.frame_end = 2, 251
export(os.path.join(out, 'fp_rifle.glb'), 'SCENE')

# ---- pistol (FPS pistol animations, Cransh) ----
reset()
bpy.ops.import_scene.fbx(filepath=os.path.join(src, 'fps-pistol-animations/source/Armpist.fbx'))
# the pistol's own parts stay (frame 'pistol_ref', slide, magazine): it is the pistol shown in the hands
for o in list(bpy.data.objects):
    if o.type == 'MESH' and not (o.name == 'arms' or o.name.startswith('xd_frame')): bpy.data.objects.remove(o, do_unlink=True)
bpy.data.objects['xd_frame'].name = 'pistol_ref'
arm = bpy.data.objects['Armature']
# every action onto the armature's NLA so each exports as its own clip
arm.animation_data_create()
for a in bpy.data.actions:
    t = arm.animation_data.nla_tracks.new(); t.name = a.name.split('|')[-1]; s = t.strips.new(t.name, int(a.frame_range[0]), a); t.mute = True
arm.animation_data.action = None
export(os.path.join(out, 'fp_pistol.glb'), 'NLA_TRACKS')
print('done')
