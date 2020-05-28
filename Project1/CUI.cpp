#include "stdafx.h"
#include "CUI.h"
#include "CPlaneMesh.h"
#include "CTestScene.h"

#define TEXTURES 11
CUI::CUI()
{}

CUI::CUI(int nIndex, ID3D12Device* pd3dDevice, ID3D12GraphicsCommandList* pd3dCommandList, ID3D12RootSignature* pd3dGraphicsRootSignature, float fWidth, float fHeight, float fDepth,
	XMFLOAT2 xmf2LeftTop, XMFLOAT2 xmf2LeftBot, XMFLOAT2 xmf2RightBot, XMFLOAT2 xmf2RightTop) : CPlane()
{
	m_pUIPlaneMesh = new CPlaneMesh(pd3dDevice, pd3dCommandList, fWidth, fHeight, fDepth, xmf2LeftTop, xmf2LeftBot, xmf2RightBot, xmf2RightTop, 1.0f, 1.0f);

	SetMesh(m_pUIPlaneMesh);
	
	CreateShaderVariables(pd3dDevice, pd3dCommandList);

	//CTexture* m_ppUITexture[TEXTURES];

	m_ppUITexture[0] = new CTexture(1, RESOURCE_TEXTURE2D, 0);
	m_ppUITexture[0]->LoadTextureFromFile(pd3dDevice, pd3dCommandList, L"UI/UI.dds", 0);
	m_ppUITexture[1] = new CTexture(1, RESOURCE_TEXTURE2D, 0);
	m_ppUITexture[1]->LoadTextureFromFile(pd3dDevice, pd3dCommandList, L"UI/WeaponUI.dds", 0);
	m_ppUITexture[2] = new CTexture(1, RESOURCE_TEXTURE2D, 0);
	m_ppUITexture[2]->LoadTextureFromFile(pd3dDevice, pd3dCommandList, L"UI/TimeScoreUI.dds", 0);
	m_ppUITexture[3] = new CTexture(1, RESOURCE_TEXTURE2D, 0);
	m_ppUITexture[3]->LoadTextureFromFile(pd3dDevice, pd3dCommandList, L"UI/SpeedUI.dds", 0);
	m_ppUITexture[4] = new CTexture(1, RESOURCE_TEXTURE2D, 0);
	m_ppUITexture[4]->LoadTextureFromFile(pd3dDevice, pd3dCommandList, L"UI/AltUI.dds", 0);
	m_ppUITexture[5] = new CTexture(1, RESOURCE_TEXTURE2D, 0);
	m_ppUITexture[5]->LoadTextureFromFile(pd3dDevice, pd3dCommandList, L"UI/Gunammo.dds", 0);
	m_ppUITexture[6] = new CTexture(1, RESOURCE_TEXTURE2D, 0);
	m_ppUITexture[6]->LoadTextureFromFile(pd3dDevice, pd3dCommandList, L"UI/MinimapUI.dds", 0);
	m_ppUITexture[7] = new CTexture(1, RESOURCE_TEXTURE2D, 0);
	m_ppUITexture[7]->LoadTextureFromFile(pd3dDevice, pd3dCommandList, L"UI/MinimapPoint.dds", 0);
	m_ppUITexture[8] = new CTexture(1, RESOURCE_TEXTURE2D, 0);
	m_ppUITexture[8]->LoadTextureFromFile(pd3dDevice, pd3dCommandList, L"UI/MinimapRedPoint.dds", 0);
	m_ppUITexture[9] = new CTexture(1, RESOURCE_TEXTURE2D, 0);
	m_ppUITexture[9]->LoadTextureFromFile(pd3dDevice, pd3dCommandList, L"UI/CrossHair.dds", 0);
	m_ppUITexture[10] = new CTexture(1, RESOURCE_TEXTURE2D, 0);
	m_ppUITexture[10]->LoadTextureFromFile(pd3dDevice, pd3dCommandList, L"UI/Title.dds", 0);


	UINT ncbElementBytes = ((sizeof(CB_GAMEOBJECT_INFO) + 255) & ~255);
	

	m_pUIShader = new CUIShader();

	m_pUIShader->CreateShader(pd3dDevice, pd3dCommandList, pd3dGraphicsRootSignature);
	m_pUIShader->CreateShaderVariables(pd3dDevice, pd3dCommandList);

	m_pUIShader->CreateConstantBufferViews(pd3dDevice, pd3dCommandList, m_nObjects, m_pUIShader->m_pd3dcbGameObjects, ncbElementBytes);

	for (int i = 0; i < TEXTURES; i++) CTestScene::CreateShaderResourceViews(pd3dDevice, m_ppUITexture[i], 15, false);

	m_pUIMaterial = new CMaterial(1);
	m_pUIMaterial->SetTexture(m_ppUITexture[nIndex]);
	m_pUIMaterial->SetShader(m_pUIShader);
	SetMaterial(0, m_pUIMaterial);
}

CUI::~CUI()
{
}

void CUI::MoveMinimapPoint(XMFLOAT3& xmfPlayer, CGameObject* pGameOBJ)
{
	float fx = 0.f;
	float fy = 0.f;
	
	float getx = 0.f;
	float gety = 0.f;

	getx = GET_MANAGER<ObjectManager>()->GetObjFromTag(L"player_ui9_minimap", OBJ_UI)->GetPosition().x;
	gety = GET_MANAGER<ObjectManager>()->GetObjFromTag(L"player_ui9_minimap", OBJ_UI)->GetPosition().y;

	fx = getx + (200.f / 10000.f) *xmfPlayer.x;
	fy = gety + (200.f / 10000.f) * xmfPlayer.z;

	/*cout << "-------------" << endl;
	cout << fx << ", " <<fy << endl;*/

	pGameOBJ->SetPosition(fx, fy, 0.f);
}
